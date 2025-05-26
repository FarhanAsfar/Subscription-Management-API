export const userPaths = {
    "/api/v1/user/profile": {
    get: {
      tags: ["User"],
      summary: "Get details of the logged in user",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "User details",
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
                      username: { type: "string", example: "John Doe" },
                        email: { type: "string", format: "email", example: "john@gmail.com"}
                    }
                  },
                  message: {
                    type: "string",
                    example: "User fetched successfully"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Could not fetch user's details"
        }
      }
    }
  },
  //update user account
  "/api/v1/user/update-account": {
    put: {
      tags: ["User"],
      summary: "Update account of the logged in user",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["username", "email"],
              properties: {
                username: {
                  type: "string",
                  example: "John Doe",
                },
                email: {
                  type: "string",
                  format: "email",
                  example: "john-new@gmail.com",
                },
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Account updated successfully",
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
                      username: { type: "string", example: "John New" },
                      email: {type: "string", format:"email", example: "updated-john@gmail.com"},
                    }
                  },
                  message: {
                    type: "string",
                    example: "Account updated successfully"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Could not update account"
        }
      }
    }
  },
}