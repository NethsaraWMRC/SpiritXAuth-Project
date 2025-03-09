# SpiritXAuth Project

A full-stack authentication system with JWT token implementation for secure user access.

## 📋 Project Overview

SpiritXAuth is a modern authentication system featuring:

- User registration with robust validation
- Secure login with JWT authentication
- MongoDB database integration
- React frontend with TypeScript and Tailwind CSS
- Express.js backend

## ⚙️ Setup & Installation

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Navigate to the backend directory:

```sh
cd backend
```

2. Install dependencies:

```sh
npm install
```

3. Configure environment variables:
   Required variables

PORT=5000
MONGODB_URL = <your_mongo_db_url>
JWT_SECRET=<generate_and_place_jwt_secret_key>
JWT_REFRESH_SECRET=<generate_and_place_jwt_refresh_secret_key>
JWT_EXPIRES_IN=<token_expires_time>
JWT_REFRESH_EXPIRES_IN=<refresh_token_expire_time>

4. Start the backend server:

```sh
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```sh
cd frontend
```

2. Install dependencies:

```sh
npm install
```

3. Start the frontend server:

```sh
npm run dev
```

Access the application at http://localhost:5173

### Database Setup & Configuration

MongoDB Atlas Setup (Current Configuration)
-The project is already configured to use MongoDB Atlas with the connection string in the .env file:

## 🤔 Development

### Authentication Approach:

JWT-based authentication for stateless, scalable authentication
Short-lived access tokens (15 minutes) with longer refresh tokens (7 days)

### Security Considerations:

Passwords are hashed using bcrypt for secure storage
JWT tokens are signed with separate secrets for access and refresh tokens
Environment variables are used for sensitive configuration

### User Experience:

Real-time form validation with detailed error messages
Password strength evaluation for better security guidance
Responsive design for both mobile and desktop devices

### Tech Stack Selection:

React with TypeScript for type-safe frontend development
Express.js for a lightweight, flexible backend
MongoDB for a schema-flexible database solution
Tailwind CSS for efficient styling

## ✨ Additional Features

### Enhanced Security:

Password strength indicator with real-time feedback
Input validation on both client and server sides
Automatic token refresh mechanism

### User Experience:

Responsive design works on all device sizes
Clean, modern UI with tailored feedback messages
SweetAlert2 for improved notification experience

### Code Structure:

Separation of concerns with repository, service, and controller layers
Context API for global state management
Reusable validation utilities

### Development Workflow:

Hot module replacement for faster development cycles
Environment-based configuration

## 🧪 Testing the Application

### Registration Flow:

Navigate to /signup
Enter username (8+ characters with letters, numbers, underscores, hyphens)
Create strong password (8+ chars with lowercase, uppercase, special char)
Confirm password
Submit to register

### Login Flow:

Navigate to /login
Enter registered username and password
Successfully log in to access protected routes

### Authentication Testing:

Try accessing home page (/) without logging in
System should redirect to login page
After login, protected routes become accessible

### Security Testing:

JWT tokens are stored securely
Sessions expire after the configured time period

```

```
