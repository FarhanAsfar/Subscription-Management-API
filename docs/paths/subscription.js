// docs/paths/subscription.js

export const subscriptionPaths = {
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
  //get all subscriptions by a user
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
  //cancel a subscription
  "/api/v1/subscription/cancel": {
    put: {
      tags: ["Subscriptions"],
      summary: "Cancel a subscription",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["subscriptionId"],
              properties: {
                subscriptionId: {
                  type: "string",
                  example: "68249efee14cfffc34772f51",
                },
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Subscription cancelled successfully",
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
                      status: { type: "string", example: "cancelled" },
                      user: { type: "string", example: "660f1b9f7f3f4b0021a12345" }
                    }
                  },
                  message: {
                    type: "string",
                    example: "Subscription was successfully cancelled"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Could not cancel subscription"
        }
      }
    }
  },
};
