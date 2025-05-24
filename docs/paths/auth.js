// docs/paths/auth.js

export const authPaths = {
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
            },
            400: {
              description: "Invalid input data"
            }
          }
        }
      },
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
            },
            401: {
              description: "Invalid credentials"
            }
          }
        }
      }
    }
  }
};
