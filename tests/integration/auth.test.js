// tests/integration/auth.test.js
import request from 'supertest';
import {User} from "../../models/user.model.js"
let appServer; // To hold our Express server instance from setup.js

// This runs once before all tests in this file
beforeAll(() => {
  appServer = global.__APP_SERVER__; // Get the Express app server from global setup
});

describe('POST /api/v1/auth/signup', () => {

  // --- 1. Happy Path: Successful User Registration ---
  it('should register a new user and return tokens with 201 status', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'StrongPassword123!',
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup') // Your API endpoint
      .send(userData) // Send the request body
      .expect(201); // Assert HTTP status code

    // Assertions for the response body
    //expect(res.body).toHaveProperty('accessToken');
    //expect(res.body).toHaveProperty('refreshToken');
    expect(res.body).toHaveProperty('message', 'User created successfully');
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(userData.email);
    expect(res.body.user.username).toBe(userData.username);
    expect(res.body.user).not.toHaveProperty('password'); // Crucial: ensure password is not returned

    // Assertions for database state
    const userInDb = await User.findOne({ email: userData.email });
    expect(userInDb).toBeDefined(); // User should exist in DB
    expect(userInDb.username).toBe(userData.username);
    expect(userInDb.email).toBe(userData.email);
    expect(userInDb.password).not.toBe(userData.password); // Password should be hashed (not plain)
    expect(userInDb.refreshToken).toBeDefined(); // Refresh token should be stored (if your schema does this)
  });

  // --- 2. Edge Case: Missing Required Fields ---
  it('should return 400 and an error message if email is missing', async () => {
    const userData = {
      username: 'user_no_email',
      // email: 'missing', // Missing
      password: 'Password123!',
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup')
      .send(userData)
      .expect(400); // Assert HTTP status code

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('email is required'); // Or specific error from your validation
  });

  it('should return 400 and an error message if password is missing', async () => {
    const userData = {
      username: 'user_no_pass',
      email: 'no_pass@example.com',
      // password: 'missing', // Missing
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup')
      .send(userData)
      .expect(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('password is required');
  });

  // --- 3. Edge Case: Invalid Data Format ---
  it('should return 400 for an invalid email format', async () => {
    const userData = {
      username: 'invalid_email_user',
      email: 'invalid-email', // Malformed email
      password: 'Password123!',
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup')
      .send(userData)
      .expect(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('email format is invalid'); // Or specific error from your validation
  });

  // --- 4. Edge Case: Password Complexity (if implemented in your API) ---
  it('should return 400 if password is too short', async () => {
    const userData = {
      username: 'short_pass_user',
      email: 'shortpass@example.com',
      password: 'short', // Too short
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup')
      .send(userData)
      .expect(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('password must be at least 8 characters'); // Or your specific message
  });

  // --- 5. Edge Case: Duplicate Email ---
  it('should return 409 if email already exists', async () => {
    const existingUserData = {
      username: 'existinguser',
      email: 'duplicate@example.com',
      password: 'ExistingPassword123!',
    };

    // First, create the user successfully
    await request(appServer)
      .post('/api/v1/auth/signup')
      .send(existingUserData)
      .expect(201);

    // Then, try to register again with the same email
    const duplicateUserData = {
      username: 'another_user',
      email: 'duplicate@example.com', // Same email
      password: 'AnotherPassword456!',
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup')
      .send(duplicateUserData)
      .expect(409); // Assert HTTP 409 Conflict

    expect(res.body).toHaveProperty('message', 'User with this email already exists'); // Or your specific message
  });

  // --- 6. Security Check: No Plain Password in Response ---
  it('should not return the user password in the response body', async () => {
    const userData = {
      username: 'secureuser',
      email: 'secure@example.com',
      password: 'SecurePassword123!',
    };

    const res = await request(appServer)
      .post('/api/v1/auth/signup')
      .send(userData)
      .expect(201);

    expect(res.body).not.toHaveProperty('password');
    // Ensure the `user` object within the response also doesn't contain password
    expect(res.body.user).not.toHaveProperty('password');
  });

});