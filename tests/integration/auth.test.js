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

        // Verifying that user exists in database
        const userInDb = await User.findOne({email: userData.email});

        expect(userInDb).toBeDefined();
        expect(userInDb.username).toBe(userData.username);
        expect(userInDb.email).toBe(userData.email);
        expect(userInDb.password).not.toBe(userData.password);

    });

    // 2. Check if any required field is missing
    it('should return 400 and an Error message if Email/Password are missing', async() => {
        const userData = {
            username: 'username',
            // email: missing,
            password: 'password123',
        }

        const res = await request(appServer)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(400)

        expect(res.body).toHaveProperty('message', 'All fields are required');
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('statusCode', 400);
    });

    // 3. Invalid data fromat
    it('should return 500 if invalid Email is given', async() => { 
        const userData = {
            username: 'username',
            email: 'invalid-email',
            password: 'password123',
        }       

        const res = await request(appServer)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(500)

        expect(res.body).toHaveProperty('message', 'User validation failed: email: Please enter a valid email address');
        expect(res.body).toHaveProperty('success', false);
    });


    // 4. Check if password is too short
    it('should return 500 if password is too short', async () => {
        const userData = {
            username: 'username',
            email: 'user@gmail.com',
            password: '123', //minimum password length should be 4
        }

        const res = await request(appServer)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(500)

        expect(res.body).toHaveProperty('message', 'User validation failed: password: Path `password` (`123`) is shorter than the minimum allowed length (4).');
        //this message depends on how you are setting error message in the error middleware.
        expect(res.body).toHaveProperty('success', false);
    });

    // 5. Check if email already exists
    it('should return 409 if Email already exists', async() => {
        const userData = {
            username: 'username1',
            email: 'existingEmail@gmail.com',
            password: 'password123',
        }

        // First create the user data successfully
        await request(appServer)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(201)

        // Then try to register with the same Email again
        const newUser = {
            username: 'newUser',
            email: 'existingEmail@gmail.com', // same email
            password: 'password123',
        }

        const res = await request(appServer)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .expect(409)

        expect(res.body).toHaveProperty('message', 'Username or Email already exists');
        expect(res.body).toHaveProperty('success', false);
    })
})

describe ('POST /api/v1/auth/signin', () => {
    // 6. Check if singin is successful 
    it('should return 200 if user signs in succesfully', async()  => {
        const signupUser = {
            username: 'signupuser',
            email: 'signupUser@gmail.com',
            password: 'user123',
        }
        // First create the user before signing in
        const signupRes = await request(appServer)
        .post('/api/v1/auth/signup')
        .send(signupUser)
        .expect(201)

        const userInDb = await User.findOne({email:signupUser.email});
        console.log(userInDb);
        
        // Then try to singin with the created user
        const signinUser = {
            email: signupUser.email,
            password: signupUser.password,
        }
        console.log("sign in attempt..")
        const res = await request(appServer)
        .post('/api/v1/auth/signin')
        .send(signinUser)
        .expect(200)
        
        console.log("signin status: ", res.status);
        console.log("signin body: ", res.body);

        expect(res.body).toHaveProperty('message', 'user logged in successfully');
        expect(res.body).toHaveProperty('success', true);
    });

    // 7. Check if Email or Password is missing
    it('should return 400 if Email or Password is missing', async() => {
        const userData = {
            // email: 'missing',
            password: 'user123',
        }

        const res = await request(appServer)
        .post('/api/v1/auth/signin')
        .send(userData)
        .expect(400)

        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'Email and Password are required');

    });

    // 8. Check if password does not match
    it('should return 401 if the password is Invalid', async() => {
        const signupUser = {
            username: 'newuser',
            email: 'user@gmail.com',
            password: 'user123',
        }
        await request(appServer)
        .post('/api/v1/auth/signup')
        .send(signupUser)
        .expect(201)

        const createdUser = {
            email: signupUser.email,
            password: 'invalid-password',
        }

        const res = await request(appServer)
        .post('/api/v1/auth/signin')
        .send(createdUser)
        .expect(401)

        expect(res.body).toHaveProperty('message', "Invalid Password");
        expect(res.body).toHaveProperty('success', false);

    })
})