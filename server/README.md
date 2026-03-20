# Thumblify – Backend

A RESTful API service that powers AI-driven thumbnail generation, providing seamless integration with Google Gemini AI and cloud-based image storage.

## Overview

Thumblify Backend is built to handle user management, AI-powered thumbnail generation, and cloud image storage. The service processes thumbnail requests through Google's Gemini API and stores the generated assets on Cloudinary for scalable delivery.

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js (TypeScript)
- **Database:** MongoDB with Mongoose ODM
- **AI Service:** Google Gemini API
- **Image Storage:** Cloudinary
- **Language:** TypeScript

## Project Structure
```
server/
│
├── config/
│   ├── ai.ts                    # Google Gemini AI configuration
│   └── db.ts                    # MongoDB connection setup
│
├── controllers/
│   ├── AuthControllers.ts       # Authentication logic
│   ├── ThumbnailController.ts   # Thumbnail operations
│   └── UserController.ts        # User management
│
├── middlewares/
│   └── auth.ts                  # Authentication middleware
│
├── models/
│   ├── Thumbnail.ts             # Thumbnail data schema
│   └── User.ts                  # User data schema
│
├── routes/
│   ├── AuthRoutes.ts            # Authentication endpoints
│   ├── ThumbnailRoutes.ts       # Thumbnail endpoints
│   └── UserRoutes.ts            # User endpoints
│
├── index.ts / app.ts            # Application entry point
└── README.md
```

## Environment Configuration

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_google_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Google Gemini API key
- Cloudinary account

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/thumblify.git
cd thumblify/server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables as described above

4. Start the development server:
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Core Features

### AI-Powered Thumbnail Generation

The service leverages Google Gemini API to generate intelligent thumbnail content based on user input. Generated images are automatically uploaded to Cloudinary, with the resulting URLs stored in MongoDB for efficient retrieval.

### API Capabilities

**Authentication & User Management**
- User registration and login
- User profile management
- Session handling

**Thumbnail Operations**
- AI-based thumbnail generation
- Thumbnail metadata storage
- Thumbnail retrieval and listing
- Thumbnail deletion

### Cloud Infrastructure

Cloudinary integration provides reliable image hosting with benefits including secure storage, optimized delivery through CDN, and horizontal scalability.

## Security Considerations

- Environment variables manage sensitive credentials
- Authentication middleware validates requests
- Note: JWT-based authentication is not currently implemented

## Roadmap

The following enhancements are planned for future releases:

- JWT or OAuth 2.0 authentication implementation
- API rate limiting and throttling
- Thumbnail versioning and history tracking
- Payment gateway integration
- Redis caching layer
- Role-based access control (RBAC)
- Comprehensive API documentation with Swagger/OpenAPI

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

---  
**Built with:** Express.js, MongoDB, Google Gemini AI, and Cloudinary