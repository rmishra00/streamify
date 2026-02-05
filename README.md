## Streamify - Movie Streaming Backend

Streamify is a backend service for a movie streaming web application, built using Node.js, Express, and MongoDB.  
It provides secure authentication, scalable REST APIs, and serves as the foundation for a full-stack streaming platform.

## Features Implemented

###  Authentication
- User registration with encrypted passwords
- User login with JWT-based authentication
- Secure password hashing using bcrypt
- Token-based session management

## Backend Architecture
- Modular folder structure (controllers, routes, models)
- Environment variable management using dotenv
- MongoDB Atlas integration using Mongoose
- Centralized error handling and clean API responses

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Postman (API testing)


##  Project Structure
```
backend/
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── authController.js
│ ├── routes/
│ │ └── authRoutes.js
│ ├── models/
│ │ └── User.js
│ └── middleware/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
## Environment Variables

Create a `.env` file in the root directory and add the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
