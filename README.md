# MERN Three.js Backend API

Backend service for the MERN + Three.js Assignment project.

This backend is built using Node.js, Express.js, and MongoDB. It provides authentication APIs, 3D model upload APIs, and interaction state persistence for the frontend Three.js viewer.

---

# Features

- User Registration and Login
- JWT Authentication
- Protected Routes
- Upload `.glb` 3D Model Files
- Save Camera / Interaction State
- MongoDB Data Persistence
- RESTful API Architecture
- Production Ready Folder Structure
- Security Middleware
- Render Deployment Ready

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- bcryptjs
- Helmet
- CORS
- Morgan

## Deployment

- Render
- MongoDB Atlas

---

# Folder Structure

```bash
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── model.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   └── Model3D.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── model.routes.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── generateToken.js
│   │
│   ├── app.js
│   └── server.js
│
├── uploads/
├── .env.example
├── .gitignore
├── Dockerfile
├── ecosystem.config.js
├── package.json
└── README.md
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

---

# Installation and Setup

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

---

## 2. Navigate to Backend Folder

```bash
cd backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create `.env` file:

```bash
touch .env
```

Add environment variables from `.env.example`.

---

## 5. Start Development Server

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

# Production Start

```bash
npm start
```

---

# API Endpoints

# Authentication APIs

## Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Aditya Rai",
  "email": "aditya@example.com",
  "password": "password123"
}
```

---

## Login User

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "aditya@example.com",
  "password": "password123"
}
```

---

## Get Current User

```http
GET /api/auth/me
```

Requires JWT token.

---

# 3D Model APIs

## Upload 3D Model

```http
POST /api/models/upload
```

### Headers

```http
Authorization: Bearer <token>
```

### Form Data

```txt
file: .glb file
```

---

## Get User Models

```http
GET /api/models
```

---

## Get Single Model

```http
GET /api/models/:id
```

---

## Save Camera State

```http
PATCH /api/models/:id/state
```

### Request Body

```json
{
  "cameraState": {
    "position": {
      "x": 1,
      "y": 2,
      "z": 5
    },
    "target": {
      "x": 0,
      "y": 0,
      "z": 0
    }
  }
}
```

---

## Delete Model

```http
DELETE /api/models/:id
```

---

# Authentication Flow

1. User registers or logs in
2. Backend generates JWT token
3. Frontend stores token
4. Token is sent in Authorization header
5. Protected APIs validate token
6. Authenticated user gets access to resources

Example:

```http
Authorization: Bearer your_jwt_token
```

---

# Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected routes
- Helmet security middleware
- CORS protection
- File type validation
- User scoped database queries
- Environment variable protection

---

# File Upload Support

Supported file format:

```txt
.glb
```

Uploaded files are stored locally inside:

```bash
backend/uploads/
```

---

# Database Models

## User Model

Stores:

- Name
- Email
- Password (hashed)

---

## Model3D Model

Stores:

- User reference
- Model filename
- File URL
- Camera state
- Upload timestamps

---

# Deployment

## Backend Deployment

- Render

## Database

- MongoDB Atlas

---

# Render Deployment Steps

## Build Command

```bash
npm install
```

---

## Start Command

```bash
npm start
```

---

## Root Directory

```txt
backend
```

---

# Environment Variables on Render

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend.vercel.app
```

---

# Future Improvements

- AWS S3 File Storage
- Docker Deployment
- Redis Caching
- Refresh Tokens
- Password Reset
- Multiple 3D File Format Support
- CDN Support
- Role Based Authentication
- Real Time Collaboration

---

# Limitations

- Local file upload storage
- Only `.glb` support
- No CDN integration
- No refresh token implementation

---

# Author

Aditya Rai
