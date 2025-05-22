import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "./app.js"


let mongo;
let server;

// This runs once before all test suites
beforeAll(async () => {
  // Start the in-memory MongoDB server
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  // Connect Mongoose to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Start your Express application in test mode
  // Using app.listen(0) makes it listen on a random available port,
  // which is great for tests as it avoids port conflicts.
  server = app.listen(0);
  global.__APP_SERVER__ = server; // Make the server instance globally available to tests
});

// This runs before EACH individual test
beforeEach(async () => {
  // Clear the database before each test to ensure test isolation
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// This runs once after all test suites are finished
afterAll(async () => {
  // Close the Express server
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
  // Disconnect Mongoose
  await mongoose.disconnect();
  // Stop the in-memory MongoDB server
  if (mongo) {
    await mongo.stop();
  }
});