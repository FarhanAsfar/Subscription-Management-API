# Subscription Management API

[![Build Status](https://github.com/FarhanAsfar/subscription-Management-API/actions/workflows/build.yml/badge.svg)](https://github.com/FarhanAsfar/subscription-Management-API/actions)

A REST API built with Node.js, Express, and MongoDB. Features secure authentication (JWT, bcrypt), role-based access control (RBAC), Dockerized deployment, Swagger/OpenAPI documentation, and CI/CD via GitHub Actions.

## Features

- RESTful endpoints for user accounts and subscriptions
- JWT-based authentication and bcrypt password hashing
- Role-based access control (admin routes)
- Swagger/OpenAPI documentation
- Dockerized for easy deployment; deployed on Render
- CI/CD with GitHub Actions

## Tech Stack

- Languages: JavaScript
- Frameworks: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT, bcrypt
- Testing: Jest, Supertest
- Docs: Swagger/OpenAPI
- DevOps: Docker, GitHub Actions, Render
- Optional: Cloudinary (user profile images)

## Prerequisites

- Node.js v20+
- MongoDB (local or Atlas)
- Docker (optional)

## Installation

Clone and install:

```bash
git clone https://github.com/FarhanAsfar/subscription-Management-API.git
cd subscription-Management-API
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/subscription-api
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

## Running

Run locally:

```bash
npm start
# API: http://localhost:3000
```

Run tests:

```bash
npm test
```

Run with Docker:

```bash
docker build -t arnob21/subscription-api .
docker run -p 3000:3000 --env-file .env arnob21/subscription-api
```

## API Endpoints

Swagger UI Link: https://subscription-management-api-8olf.onrender.com/api-docs

| Method | Endpoint                                      | Description                 | Auth Required |
|--------|-----------------------------------------------|-----------------------------|---------------|
| POST   | /api/v1/auth/signup                            | Register a new user         | None          |
| POST   | /api/v1/auth/signin                            | User login                  | None          |
| POST   | /api/v1/auth/signout                           | User logout                 | JWT           |
| POST   | /api/v1/subscription/create-subscription       | Create a new subscription   | JWT           |
| GET    | /api/v1/subscription                           | Retrieve user subscriptions | JWT           |
| PUT    | /api/v1/subscription/cancel-subscription       | Cancel a subscription       | JWT           |
| GET    | /api/v1/user/profile                           | Get user profile            | JWT           |
| PUT    | /api/v1/user/update-account                    | Update user account         | JWT           |
| PUT    | /api/v1/user/change-password                   | Change user password        | JWT           |

## Deployment & CI/CD

- Live Demo: https://subscription-management-api-8olf.onrender.com/
- Docker Image: https://hub.docker.com/r/arnob21/subscription-api
- CI/CD: GitHub Actions workflows:
    - build.yml — installs dependencies and runs tests on PRs
    - deploy.yml — builds and pushes Docker image on push to main

## Testing

- Unit tests: validate helpers (e.g., JWT generation, bcrypt hashing)
- Integration tests: test endpoints using Supertest
- Run: `npm test` 
