import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import MeetingRoom from "./components/MeetingRoom";
import LandingPage from "./LandingPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import axios from "axios";

const socket = io("http://localhost:8000");

function MeetingApp({ meetingId, username }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRemoteCameraOn, setIsRemoteCameraOn] = useState(true);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const toggleMute = () => {
    const stream = localStreamRef.current;

    if (!stream) return;

    const audioTrack = stream.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);

    console.log(audioTrack.enabled ? "Microphone unmuted" : "Microphone muted");
  };

  const toggleCamera = () => {
    const stream = localStreamRef.current;

    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(videoTrack.enabled);

    socket.emit("camera-status", meetingId, videoTrack.enabled);

    console.log(videoTrack.enabled ? "Camera ON" : "Camera OFF");
  };

  // NEW: screen stream ko bas band karta hai (call end/leave/cleanup mein use hota hai)
  const releaseScreenStream = () => {
    screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    screenStreamRef.current = null;
    setIsSharing(false);
  };

  // NEW: screen share band karke wapis camera bhejo
  const stopScreenShare = async () => {
    if (!screenStreamRef.current) return;

    releaseScreenStream();

    const cameraTrack = localStreamRef.current?.getVideoTracks()[0];
    const sender = peerConnectionRef.current
      ?.getSenders()
      .find((s) => s.track?.kind === "video");

    if (sender && cameraTrack) {
      await sender.replaceTrack(cameraTrack);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }

    console.log("Screen sharing stopped");
  };

  // NEW: camera ki jagah screen bhejo
  const startScreenShare = async () => {
    const peer = peerConnectionRef.current;

    if (!peer) return;

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];

      const sender = peer.getSenders().find((s) => s.track?.kind === "video");

      if (!sender) {
        screenStream.getTracks().forEach((t) => t.stop());
        return;
      }

      await sender.replaceTrack(screenTrack);

      screenStreamRef.current = screenStream;
      localVideoRef.current.srcObject = screenStream;
      setIsSharing(true);

      // Browser ke "Stop sharing" button se band ho to bhi camera wapis aa jaye
      screenTrack.onended = stopScreenShare;

      console.log("Screen sharing started");
    } catch (error) {
      console.log("Screen share cancelled:", error);
    }
  };

  const toggleScreenShare = () => {
    if (isSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  const endCall = () => {
    socket.emit("end-call", meetingId);
    releaseScreenStream(); // NEW
    const stream = localStreamRef.current;

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    console.log("Call ended");
    setIsCallEnded(true);
  };

  const leaveCall = () => {
    socket.emit("leave-call", meetingId);
    releaseScreenStream(); // NEW

    const stream = localStreamRef.current;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setIsMicOn(false);
    setIsCameraOn(false);
    setIsCallEnded(true);

    console.log("You left the meeting");
  };

  useEffect(() => {
    let localStream;
    let cameraReady = false;
    let hasJoinedCall = false;
    let remoteUserId = null;

    const startCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = localStream;

        localVideoRef.current.srcObject = localStream;

        console.log("Camera and microphone started");

        const peer = new RTCPeerConnection();
        peer.onconnectionstatechange = () => {
          console.log("Connection state:", peer.connectionState);
        };

        peer.oniceconnectionstatechange = () => {
          console.log("ICE state:", peer.iceConnectionState);
        };
        peerConnectionRef.current = peer;

        peer.onicecandidate = (event) => {
          if (event.candidate && remoteUserId) {
            socket.emit("signal", remoteUserId, {
              type: "candidate",
              candidate: event.candidate,
            });
          }
        };

        peer.ontrack = (event) => {
          console.log("Remote video track received");

          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        localStream.getTracks().forEach((track) => {
          peer.addTrack(track, localStream);
        });

        cameraReady = true;
        console.log("Peer connection is ready");

        joinCall();
      } catch (error) {
        console.error("Camera/Microphone error:", error);
      }
    };

    const joinCall = () => {
      if (!socket.connected || !cameraReady || hasJoinedCall) {
        return;
      }
      hasJoinedCall = true;

      console.log("Connected:", socket.id);
      socket.emit("join-call", meetingId,username);
    };

    socket.on("connect", joinCall);

    socket.on("you-are-host", (value) => {
      setIsHost(value);
      console.log("Am I host?", value);
    });

    socket.on("existing-users", (users) => {
      console.log("Existing users:", users);
    });

    const handleCameraStatus = (userId, isCameraOn) => {
      setIsRemoteCameraOn(isCameraOn);
    };

    socket.on("camera-status", handleCameraStatus);

    socket.on("user-left", (userId) => {
      console.log("Participant left:", userId);

      // NEW: agar hum screen share kar rahe the, use band karo aur local preview wapis camera par
      releaseScreenStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    });

    socket.on("call-ended", (userId) => {
      console.log("Other participant ended the call:", userId);
      setIsCallEnded(true);
      releaseScreenStream(); // NEW

      const stream = localStreamRef.current;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }

      setIsMicOn(false);
      setIsCameraOn(false);
    });

    socket.on("user-joined", async (userId) => {
      console.log("New user joined:", userId);
      remoteUserId = userId;
      const peer = peerConnectionRef.current;

      if (!peer) {
        console.log("Peer connection not ready");
        return;
      }

      const offer = await peer.createOffer();

      await peer.setLocalDescription(offer);

      socket.emit("signal", userId, {
        type: "offer",
        offer: peer.localDescription,
      });

      console.log("Offer sent to:", userId);
    });

    socket.on("signal", async (fromId, message) => {
      console.log("Signal received from:", fromId);
      console.log("Message:", message);

      if (message.type === "offer") {
        const peer = peerConnectionRef.current;
        remoteUserId = fromId;

        if (!peer) {
          console.error("Peer connection is not ready");
          return;
        }

        await peer.setRemoteDescription(
          new RTCSessionDescription(message.offer),
        );

        const answer = await peer.createAnswer();

        await peer.setLocalDescription(answer);

        socket.emit("signal", fromId, {
          type: "answer",
          answer: peer.localDescription,
        });

        console.log("Answer sent to:", fromId);
      }
      if (message.type === "answer") {
        const peer = peerConnectionRef.current;

        if (!peer) {
          console.error("Peer connection is not ready");
          return;
        }

        await peer.setRemoteDescription(
          new RTCSessionDescription(message.answer),
        );

        console.log("Answer received and applied");
      }

      if (message.type === "candidate") {
        const peer = peerConnectionRef.current;

        if (!peer) {
          console.error("Peer connection is not ready");
          return;
        }

        await peer.addIceCandidate(new RTCIceCandidate(message.candidate));

        console.log("ICE candidate received and added");
      }
    });

    startCamera();

    return () => {
      socket.off("connect", joinCall);
      socket.off("you-are-host"); // NEW
      socket.off("existing-users");
      socket.off("user-left"); // NEW
      socket.off("user-joined");
      socket.off("signal");
      socket.off("call-ended");
      socket.off("camera-status", handleCameraStatus);

      screenStreamRef.current?.getTracks().forEach((t) => t.stop()); // NEW

      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }

      peerConnectionRef.current?.close();
      peerConnectionRef.current = null;
    };
  }, [meetingId, username]);

  return (
    <MeetingRoom
      meetingId={meetingId}
      username={username}
      socket={socket}
      isCallEnded={isCallEnded}
      isMicOn={isMicOn}
      isCameraOn={isCameraOn}
      isSharing={isSharing}
      isHost={isHost}
      toggleMute={toggleMute}
      toggleCamera={toggleCamera}
      toggleScreenShare={toggleScreenShare}
      leaveCall={leaveCall}
      endCall={endCall}
      localVideoRef={localVideoRef}
      remoteVideoRef={remoteVideoRef}
      isRemoteCameraOn={isRemoteCameraOn}
    />
  );
}

function App() {
  const [authPage, setAuthPage] = useState(
    sessionStorage.getItem("token") ? "checking" : "landing",
  );

  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || "",
  );
  const [meetingId, setMeetingId] = useState(() => {
    const path = window.location.pathname;
    return path.startsWith("/meeting/") ? path.split("/meeting/")[1] : "";
  });

  useEffect(() => {
    const handleBackButton = () => {
      const path = window.location.pathname;

      if (path.startsWith("/meeting/")) {
        setMeetingId(path.split("/meeting/")[1]);
      } else {
        setMeetingId("");
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setAuthPage("landing");
        return;
      }

      try {
        await axios.get("http://localhost:8000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuthPage("dashboard");
      } catch (error) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        setUsername("");
        setAuthPage("landing");
        console.log(
          "Token verification failed:",
          error.response?.data?.message || "Something went wrong",
        );
      }
    };

    verifyToken();
  }, []);

  const startMeeting = () => {
    const newMeetingId = crypto.randomUUID();

    window.history.pushState({}, "", `/meeting/${newMeetingId}`);

    setMeetingId(newMeetingId);
  };

  const joinMeeting = (id) => {
    window.history.pushState({}, "", `/meeting/${encodeURIComponent(id)}`);

    setMeetingId(id);
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        credentials,
      );

      const token = response.data.token;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", credentials.username);

      console.log("Login successful!");
      setUsername(credentials.username);
      setAuthPage("dashboard");
    } catch (error) {
      console.log(
        "Login failed:",
        error.response?.data?.message || "Something went wrong",
      );
    }
  };
  const handleSignup = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        userData,
      );

      console.log("Signup successful:", response.data);

      alert("Account created successfully! Please login.");

      setAuthPage("login");
    } catch (error) {
      console.log(
        "Signup failed:",
        error.response?.data?.message || "Something went wrong",
      );

      alert(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  };
  if (authPage === "checking") {
    return (
      <div className="min-h-screen bg-[#080D1B] flex items-center justify-center text-white">
        Checking your session...
      </div>
    );
  }
  if (!meetingId) {
    if (authPage === "landing") {
      return (
        <LandingPage
          onLogin={() => setAuthPage("login")}
          onSignup={() => setAuthPage("signup")}
        />
      );
    }

    if (authPage === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthPage("signup")}
        />
      );
    }

    if (authPage === "signup") {
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthPage("login")}
        />
      );
    }
    if (authPage === "dashboard") {
      return (
        <Dashboard
          username={username}
          onStartMeeting={startMeeting}
          onJoinMeeting={joinMeeting}
          onLogout={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            setUsername("");
            setAuthPage("login");
          }}
        />
      );
    }
  }

  return <MeetingApp meetingId={meetingId} username={username} />;
}

export default App;
