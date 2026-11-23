import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};
let hosts = {};
let participants = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // JOIN CALL
    socket.on("join-call", (path, username) => {
      console.log("Join call received:", path);

      if (connections[path] === undefined) {
        connections[path] = [];
      }

      if (hosts[path] === undefined) {
        hosts[path] = socket.id;
        console.log("Meeting host:", socket.id);
      }

      if (connections[path].includes(socket.id)) {
        console.log("User already joined:", socket.id);
        return;
      }

      // Existing users
      const existingUsers = [...connections[path]];

      // Add current user
      connections[path].push(socket.id);

      if (participants[path] === undefined) {
        participants[path] = {};
      }

      participants[path][socket.id] = username || "Guest";

      // Store joining time
      timeOnline[socket.id] = new Date();

      console.log("Users in room:", connections[path]);

      // Tell new user about existing users
      socket.emit("existing-users", existingUsers);

      console.log("Host ID:", hosts[path], "Current socket:", socket.id);

      socket.emit("you-are-host", hosts[path] === socket.id);

      // Tell existing users about new user
      for (let a = 0; a < existingUsers.length; a++) {
        io.to(existingUsers[a]).emit("user-joined", socket.id);
      }

      // Send updated participant list
      const participantList = Object.values(participants[path]);

      connections[path].forEach((userId) => {
        io.to(userId).emit("participant-list", participantList);
      });

      // Send previous messages
      if (messages[path] !== undefined) {
        socket.emit("chat-history", messages[path]);
      }
    });

    // WEBRTC SIGNALING
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    // CAMERA STATUS
    socket.on("camera-status", (path, isCameraOn) => {
      const roomUsers = connections[path] || [];

      roomUsers.forEach((userId) => {
        if (userId !== socket.id) {
          io.to(userId).emit("camera-status", socket.id, isCameraOn);
        }
      });
    });

    // LEAVE MEETING (ONLY FOR CURRENT USER)
    socket.on("leave-call", (path) => {
      const roomUsers = connections[path];

      if (!roomUsers) return;

      const index = roomUsers.indexOf(socket.id);

      if (index === -1) return;

      // Remove only this participant
      roomUsers.splice(index, 1);
      delete timeOnline[socket.id];

      // Remove participant username
      delete participants[path][socket.id];

      // Broadcast updated participant list
      const participantList = Object.values(participants[path]);

      roomUsers.forEach((userId) => {
        io.to(userId).emit("participant-list", participantList);
      });

      // Notify remaining participants
      roomUsers.forEach((userId) => {
        io.to(userId).emit("user-left", socket.id);
      });

      // If the host leaves, remove the room's host
      if (hosts[path] === socket.id) {
        delete hosts[path];
      }

      // Delete empty room
      if (roomUsers.length === 0) {
        delete connections[path];
        delete messages[path];
        delete hosts[path];
      }

      console.log("User left meeting:", socket.id);
    });

    // END MEETING FOR EVERYONE (HOST ONLY)
    socket.on("end-call", (path) => {
      const roomUsers = connections[path];

      if (!roomUsers) return;

      // Check whether the user is the host
      if (hosts[path] !== socket.id) {
        socket.emit("error-message", "Only the host can end the meeting.");
        return;
      }

      // Notify everyone in the meeting
      roomUsers.forEach((userId) => {
        io.to(userId).emit("call-ended", socket.id);
      });

      // Clean up meeting data
      roomUsers.forEach((userId) => {
        delete timeOnline[userId];
      });

      delete connections[path];
      delete messages[path];
      delete hosts[path];

      console.log("Meeting ended by host:", socket.id);
    });

    // GET CHAT HISTORY
    socket.on("get-chat-history", (path) => {
      const roomUsers = connections[path] || [];

      if (roomUsers.includes(socket.id)) {
        socket.emit("chat-history", messages[path] || []);
      }
    });

    // CHAT MESSAGE
    socket.on("chat-message", (data, sender) => {
      const path = data.path;
      const message = {
        sender: sender,
        data: data.message,
        time: new Date(),
      };

      if (messages[path] === undefined) {
        messages[path] = [];
      }

      messages[path].push(message);

      if (connections[path] !== undefined) {
        for (let a = 0; a < connections[path].length; a++) {
          io.to(connections[path][a]).emit("chat-message", message);
        }
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      delete timeOnline[socket.id];

      for (const path in connections) {
        const index = connections[path].indexOf(socket.id);

        if (index !== -1) {
          connections[path].splice(index, 1);
          delete participants[path][socket.id];
          if (hosts[path] === socket.id) {
            delete hosts[path];
          }

          // Tell remaining users
          for (let a = 0; a < connections[path].length; a++) {
            io.to(connections[path][a]).emit("user-left", socket.id);
          }

          // Send updated participant list
          const participantList = Object.values(participants[path]);

          connections[path].forEach((userId) => {
            io.to(userId).emit("participant-list", participantList);
          });

          // Delete empty room
          if (connections[path].length === 0) {
            delete connections[path];
            delete messages[path];
          }

          break;
        }
      }
    });
  });

  return io;
};
