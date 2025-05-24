// docs/openapi.js

import { authPaths } from "./paths/auth.js";
import { subscriptionPaths } from "./paths/subscription.js";

export const apiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Subscription Management API",
    version: "1.0.0",
    description: "API for managing user subscriptions"
  },
  servers: [
    {
      url: "https://subscription-management-api-8olf.onrender.com",
      description: "Production server"
    },
    {
      url: process.env.PORT ? `http://localhost:${process.env.PORT}` : "http://localhost:8000",
      description: "Development server"
    }
  ],
  tags: [
    {
      name: "Authentication",
      description: "User authentication endpoints"
    },
    {
      name: "Subscriptions",
      description: "Subscription management endpoints"
    },
    {
      name: "User",
      description: "User account endpoints"
    }
  ],
  paths: {
    ...authPaths, // Merge authentication paths
    ...subscriptionPaths, // Merge subscription paths
    // You can add more paths here or import from other files
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};
