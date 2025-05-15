# Quiz Engine API

A simple backend API for a quiz engine using Node.js (Express) and MongoDB.

## Features
- Admins can create, update, and delete quizzes and questions
- Users can register, log in, take quizzes, and view their results
- JWT-based authentication and role-based access control

## Tech Stack
- Node.js (Express)
- MongoDB (Mongoose)
- JWT for authentication

## Getting Started

### Installation
1. Clone the repository
2. Go to the `server` directory
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Create a `.env` file in the `server` directory with the following:
   ```env
   MONGODB_URI=mongodb://localhost:27017/quizdb
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
5. Start the server:
   ```powershell
   node src/index.js
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` — Register (username, password, role)
- `POST /api/auth/login` — Login (username, password)

### Quizzes (Admin)
- `POST /api/quizzes` — Create quiz
- `PUT /api/quizzes/:id` — Update quiz
- `DELETE /api/quizzes/:id` — Delete quiz

### Quizzes (User)
- `GET /api/quizzes` — List quizzes
- `GET /api/quizzes/:id` — Get quiz (no answers)

### Results (User)
- `POST /api/results/submit` — Submit quiz answers
- `GET /api/results/history` — Get quiz history
