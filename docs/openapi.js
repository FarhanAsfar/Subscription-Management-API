// 1. Create a separate file for your API documentation
// docs/openapi.js

import { application, response } from "express";
import { object } from "zod";

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
      "/api/v1/auth/signup": {
        post: {
          tags: ["Authentication"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullname", "email", "password"],
                  properties: {
                    username: {
                      type: "string",
                      example: "John Doe"
                    },
                    email: {
                      type: "string",
                      format: "email",
                      example: "john@example.com"
                    },
                    password: {
                      type: "string",
                      format: "password",
                      example: "securePassword123"
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true
                      },
                      message: {
                        type: "string",
                        example: "User registered successfully"
                      },
                      user: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "6093dfa3b45e234567890123"
                          },
                          username: {
                            type: "string",
                            example: "John Doe"
                          },
                          email: {
                            type: "string",
                            example: "john@example.com"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid input data"
            }
          }
        }
      },
      "/api/v1/auth/signin": {
        post: {
          tags: ["Authentication"],
          summary: "Log in to an existing account",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "john@example.com"
                    },
                    password: {
                      type: "string",
                      format: "password",
                      example: "securePassword123"
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true
                      },
                      message: {
                        type: "string",
                        example: "Logged in successfully"
                      },
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      },
                      user: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "6093dfa3b45e234567890123"
                          },
                          fullname: {
                            type: "string",
                            example: "John Doe"
                          },
                          email: {
                            type: "string",
                            example: "john@example.com"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: "Invalid credentials"
            }
          }
        }
      },
      
      //Subscription endpoints
      "/api/v1/subscription/create-subscription": {
        post: {
          tags: ["Subscriptions"],
          summary: "Create a subscription",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "price", "currency", "frequency", "category", "startDate", "status"],
                  properties: {
                    name: {
                      type: "string",
                      example: "Netflix",
                    },
                    price: {
                      type: "number",
                      example: 13.99,
                    },
                    currency: {
                      type: "string",
                      example: "USD",
                    },
                    frequency: {
                      type: "string",
                      enum: ["weekly","monthly","yearly"],
                      example: "monthly",
                    },
                    category: {
                      type: "string",
                      enum: ["Sports", "News", "Finance", "Entertainment", "Others"],
                      example: "Entertainment",
                    },
                    startDate: {
                      type: "string",
                      format: "date",
                      example: "2025-06-21",
                    },
                
                  }
                }
              }
            }
          },
          responses: {
          201: {
            description: "Subscription was successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    statusCode: {
                      type: "integer",
                      example: 201
                    },
                    data: {
                      type: "object",
                      properties: {
                        _id: { type: "string", example: "66328d1276d4cf89eb123456" },
                        name: { type: "string", example: "Netflix" },
                        price: { type: "number", example: 15.99 },
                        currency: { type: "string", example: "USD" },
                        frequency: { type: "string", example: "monthly" },
                        category: { type: "string", example: "Entertainment" },
                        startDate: { type: "string", format: "date", example: "2025-06-01" },
                        renewalDate: { type: "string", format: "date", example: "2024-07-01" },
                        status: { type: "string", example: "active" },
                        user: { type: "string", example: "660f1b9f7f3f4b0021a12345" }
                      }
                    },
                    message: {
                      type: "string",
                      example: "Subscription was successful"
                    }
                  }
                }
              }
            }
          },
          500: {
            description: "Could not subscribe"
          }
        }
        }
      },
      "/api/v1/subscription/": {
        get: {
          tags: ["Subscriptions"],
          summary: "Get all subscriptions by a user",
          security: [{ bearerAuth: [] }],

          responses: {
          200: {
            description: "List of user's subscription",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    statusCode: {
                      type: "integer",
                      example: 200
                    },
                    data: {
                      type: "object",
                      properties: {
                        _id: { type: "string", example: "66328d1276d4cf89eb123456" },
                        name: { type: "string", example: "Netflix" },
                        price: { type: "number", example: 15.99 },
                        currency: { type: "string", example: "USD" },
                        frequency: { type: "string", example: "monthly" },
                        category: { type: "string", example: "Entertainment" },
                        startDate: { type: "string", format: "date", example: "2025-06-01" },
                        renewalDate: { type: "string", format: "date", example: "2024-07-01" },
                        status: { type: "string", example: "active" },
                        user: { type: "string", example: "660f1b9f7f3f4b0021a12345" }
                      }
                    },
                    message: {
                      type: "string",
                      example: "Fetched user's subscriptions successfully"
                    }
                  }
                }
              }
            }
          },
          500: {
            description: "Could not fetch user's subscription"
          }
        }
        }
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
  }
}