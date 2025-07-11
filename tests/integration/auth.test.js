import request from "supertest"
import { User } from "../../models/user.model.js"


let appServer; // it will hold express server instance from setup.js

// This will run once before all tests in this file
beforeAll(() => {
    appServer = global._APP_SERVER_; //get the express app server from global setup
})

describe('POST /api/v1/auth/signup', () => {

    // 1. Successful User Registration
    it('should register a new user and return status 201', async() => {

        const userData = {
            username: 'testuser',
            email: 'test@gmail.com',
            password: 'Password123',
        };

        const res = await request(appServer)
        .post('/api/v1/auth/signup') // hitting the api endpoint
        .send(userData) // send request body
        .expect(201);

        expect(res.body).toHaveProperty('message', 'User created successfully');
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.email).toBe(userData.email);
        expect(res.body.data.username).toBe(userData.username);
        expect(res.body.data).not.toHaveProperty('password'); // making sure that we are not getting password in the returned response.
    })
})