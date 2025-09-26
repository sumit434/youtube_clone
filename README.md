🎥 youtube_clone – Full-Stack Video Sharing Platform

A modern, full-stack video platform built with React, Node.js, and MongoDB. Experience YouTube-like functionality with video uploads, streaming, channels, comments, and a clean, responsive interface.
Tech Stack: React 18, Redux Toolkit, React Router, Vite, Tailwind-inspired CSS, Node.js, Express.js, MongoDB, Mongoose, JWT, Multer

✨ Features
🎬 Video Management
Upload & Streaming: Upload MP4 videos and stream seamlessly.
YouTube Embeds: Play YouTube videos directly in the platform.
Video Player: Custom player with controls, volume, and fullscreen.
Categories & Search: Filter videos by category or search in real time.

👤 User Experience
Authentication: Secure login and registration with JWT.
Profiles & Channels: Users can create profiles, manage channels, and upload content.
Responsive Design: Mobile-first design for all devices.

💬 Social Interaction
Comments: Add, edit, or delete comments on videos.
Likes & Dislikes: React to videos instantly.
Subscriptions & Follows: Subscribe to channels and follow creators.

🎨 Modern UI/UX
Smooth Animations: Transitions, hover effects, and subtle micro-interactions.
🛠️ Installation & Setup
Prerequisites
Node.js v18+
MongoDB v6+
Git

1️⃣ Clone the Repository
git clone https://github.com/sumit434/youtube_clone.git
cd youtube_clone

2️⃣ Backend Setup
cd BACKEND
npm install


Create a .env file in server/:
3️⃣ Frontend Setup
cd FRONTEND
npm install

4️⃣ Start the Application

Backend:
cd BACKEND
npm start

Frontend:
cd FRONTEND
npm run dev

Access the app at:
Frontend: http://localhost:5173
Backend API: http://localhost:8000

youtube_clone/ →
FRONTEND/ (React app: src/components, src/pages, src/features, src/api, src/app, public, package.json),
BACKEND/ (Node.js app: controllers, models, routes, middleware, uploads, package.json), README.md

🎯 API Highlights
Authentication
POST /auth/register – Register user
POST /auth/login – Login user
GET /auth/me – Get profile

Videos
GET /videos – All videos
POST /videos – Upload video
GET /videos/:id – Single video
PUT /videos/:id – Update video
DELETE /videos/:id – Delete video

Channels
POST /channels – Create channel
GET /channels/:id – Get channel
PUT /channels/:id – Update channel

Comments
GET /videos/:id/comments – Fetch comments
POST /videos/:id/comments – Add comment
PUT /videos/:id/comments/:commentId – Edit comment
DELETE /videos/:id/comments/:commentId – Delete comment


🤝 Contributing
Fork the repo
Commit changes (git commit -m "Add feature")
Push branch (git push origin feature/awesome-feature)
Open a Pull Request

Contact
GitHub: https://github.com/sumit434/youtube_clone
