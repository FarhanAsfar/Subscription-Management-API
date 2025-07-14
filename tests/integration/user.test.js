import request from "supertest"
import { User } from "../../models/user.model"

let appServer;

beforeAll(() => {
    appServer = global._APP_SERVER_;
})

describe('GET /api/v1/user/profile', () => {
    it('should return 200 after fetching user information', async() =>{
        const userData = {
            username: 'username',
            email: 'user@gmail.com',
            password: 'user123',
        }

        await request(appServer)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(201)

        const res = await request(appServer)
        .get('/api/v1/user/profile')
        .send()

        expect(createdUser.body).toHaveProperty('message', 'User fetched successfully');
        expect(createdUser.body).toHaveProperty('statusCode', 200);
    })
})