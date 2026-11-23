# Vexa – AI-Powered Video Conferencing Platform

Vexa is a real-time video conferencing web application that allows users to connect through video calls, communicate using live chat, share their screens, and generate AI-powered meeting summaries.

The project is built using the MERN stack along with WebRTC and Socket.IO for real-time communication.

## Features

### Implemented Features

- **User Authentication:** User registration and login using JWT authentication and bcrypt password hashing.
- **Video Conferencing:** Real-time peer-to-peer video calling using WebRTC.
- **Meeting Creation:** Create a meeting and generate a unique meeting ID.
- **Join Meeting:** Join an existing meeting using its meeting ID.
- **Audio and Video Controls:** Enable or disable microphone and camera during meetings.
- **Screen Sharing:** Share your screen with other participants.
- **Real-Time Chat:** Exchange messages during meetings using Socket.IO.
- **Participant List:** View participants currently connected to a meeting.
- **AI Meeting Transcription:** Convert speech into text using the browser's Web Speech API.
- **AI Meeting Summary:** Generate meeting summaries using the Google Gemini API.

### Planned Improvements

- Responsive UI improvements across mobile, tablet, and desktop.
- Persistent meeting chat history using MongoDB.
- Improved meeting security and access control.
- Better error handling and connection recovery.
- Deployment and production optimization.
- Enhanced AI meeting insights.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Socket.IO Client
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Token (JWT)
- bcrypt

### Real-Time Communication
- WebRTC
- Socket.IO

### AI Integration
- Google Gemini API
- Web Speech API

## Project Structure

```text
Vexa/
│
├── Backend/
│   ├── src/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   └── ...
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

*Note: The structure above is a simplified overview of the project.*

## Getting Started

Follow these steps to run Vexa locally.

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB database (local or MongoDB Atlas)
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/vishal812-eng/Vexa-AI-Powered-Video-Conferencing-Platform.git
```

### 2. Setup the Backend

Navigate to the backend directory:

```bash
cd Vexa/Backend
npm install
```

Create a `.env` file inside the `Backend` directory.

Add the required environment variables used by the backend configuration, such as:

- MongoDB connection string
- JWT secret
- Gemini API key

Use the exact variable names expected by the backend code. Never upload your actual `.env` file or API keys to GitHub.

### 3. Start the Backend

For development:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The backend runs on port `8000`.

### 4. Setup the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd Vexa/Frontend
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Vite will display a local URL in the terminal. Open that URL in your browser.

## Available Frontend Commands

Run these commands inside the `Frontend` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build |

## Security Notes

- Environment variables and API keys should never be committed to GitHub.
- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Keep your MongoDB credentials and Gemini API key private.

## Current Project Status

Vexa currently supports authentication, peer-to-peer video meetings, real-time chat, screen sharing, participant tracking, speech transcription, and AI-generated meeting summaries.

The project is currently being improved to make it more reliable, polished, and suitable for real-world use.

## Future Scope

- Support for group video conferencing.
- Meeting recording.
- Persistent chat and meeting history.
- Advanced AI meeting insights and action items.
- Cloud deployment.
- Improved security and scalability.

## Author

**Vishal**

B.Tech Computer Science and Engineering (AI & ML)

GitHub: [vishal812-eng](https://github.com/vishal812-eng)

---

If you find this project interesting, feel free to explore the repository!