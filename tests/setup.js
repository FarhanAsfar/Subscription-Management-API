import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app.js";

let mongo;
let server;

// This will run once before running all test suites
beforeAll(async () => {
    // first, start the in-memory mongodb server
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    // then, connect mongoose to the in-memory database
    await mongoose.connect(mongoUri);

    // start express server in test mode
    // app.listen(0) makes it listen on a random available port, its better for avoiding port conflicts
    server = app.listen(0);

    global._APP_SERVER_ = server; // make the server instance globally available
});


// This will run before EACH individual test
beforeEach(async () => {
    // Clear the db before each test to ensure test isolation
    const collections = mongoose.connection.collections;

    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

// This will run once after all test suites are finished
afterAll(async () => {
    // Close the express server
    if(server){
        await new Promise(resolve => server.close(resolve));
    }

    // Disconnect mongoose
    await mongoose.disconnect();

    // Stop in-memory database
    if(mongo){
        await mongo.stop();
    }
});