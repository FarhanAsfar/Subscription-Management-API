Subscription Management API
A production-ready REST API built with Node.js, Express, and MongoDB, featuring secure user authentication (JWT, bcrypt), role-based access control (RBAC), and comprehensive testing with Jest/Supertest. The API is Dockerized, deployed on Render with Swagger/OpenAPI documentation, and uses GitHub Actions for CI/CD, supporting 100+ concurrent users with 95% test coverage.
Features

RESTful Endpoints: Manage user accounts and subscriptions (/signup, /create-subscription, /getUserSubscriptions, /cancel-subscription).
Authentication: JWT-based auth with bcrypt password hashing for secure user sessions.
Authorization: RBAC to restrict admin routes (e.g., /create-admin) to authorized roles.
Testing: 10+ Jest/Supertest unit and integration tests ensuring 95% coverage.
Documentation: Swagger/OpenAPI UI for interactive endpoint exploration.
Deployment: Dockerized services deployed on Render, with CI/CD via GitHub Actions.
Scalability: Handles 100+ concurrent users, optimized with MongoDB indexing.

Tech Stack

Languages: JavaScript
Frameworks: Node.js, Express
Database: MongoDB (Mongoose)
Auth: JWT, bcrypt
Testing: Jest, Supertest
Documentation: Swagger/OpenAPI
DevOps: Docker, GitHub Actions, Render
Other: Cloudinary (optional for user profile images)

Installation
Prerequisites

Node.js v20+
MongoDB (local or Atlas)
Docker (optional for containerized setup)

Steps

Clone the Repository
git clone https://github.com/FarhanAsfar/subscription-Management-API.git
cd subscription-Management-API


Install Dependencies
npm install


Set Up Environment VariablesCreate a .env file in the root directory:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/subscription-api
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url


Run Locally
npm start

API runs at http://localhost:3000. Access Swagger docs at /api-docs.

Run Tests
npm test


Run with Docker
docker build -t arnob21/subscription-api .
docker run -p 3000:3000 --env-file .env arnob21/subscription-api



API Endpoints



Method
Endpoint
Description
Auth Required



POST
/api/v1/auth/signup
Register a new user
None


POST
/api/v1/auth/signin
User login
None


POST
/api/v1/auth/signout
User logout
JWT


POST
/api/v1/subscription/create-subscription
Create a new subscription
JWT


GET
/api/v1/subscription
Retrieve user subscriptions
JWT


PUT
/api/v1/subscription/cancel-subscription
Cancel a subscription
JWT


GET
/api/v1/user/profile
Get user profile
JWT


PUT
/api/v1/user/update-account
Update user account
JWT


PUT
/api/v1/user/change-password
Change user password
JWT


Explore all endpoints via Swagger at https://subscription-management-api-8olf.onrender.com/api-docs.

[<image-card alt="Build Status" src="https://github.com/FarhanAsfar/subscription-Management-API/actions/workflows/build.yml/badge.svg" ></image-card>](https://github.com/FarhanAsfar/subscription-Management-API/actions)
Deployment

Live Demo: https://subscription-management-api-8olf.onrender.com/
Docker Image: https://hub.docker.com/r/arnob21/subscription-api
CI/CD: Automated builds and deployments via GitHub Actions. See .github/workflows/build.yml and .github/workflows/deploy.yml.

Testing

Unit Tests: Validate core functions (e.g., JWT generation, bcrypt hashing).
Integration Tests: Test endpoints with Supertest (e.g., /create-subscription).
Run npm test to execute 10+ tests with 95% coverage.

CI/CD Pipeline

Build: Runs on PRs to main branch, installs dependencies, and executes tests (build.yml).
Deploy: On push to main, builds and pushes Docker image to Docker Hub (deploy.yml).



