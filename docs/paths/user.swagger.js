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
}