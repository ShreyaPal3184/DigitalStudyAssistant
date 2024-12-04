import { use } from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";

const chai = use(chaiHttp);
const request = chai.request.execute;
chai.should();

describe('Login API', () => {
    it('should return token and success message for valid credentials', (done) => {
        const user = {
            email: 'user4@gmail.com',
            password: 'pwduser4'
        };

        request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                res.body.should.not.have.property('error')
                done();
            });
    });

    it('should return an error message for invalid credentials', (done) => {
        const user = {
            email: "user@gmail.com",
            password: "pwd"
        }

        request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });           
    });

    it('should return an error message for missing email', (done) => {
        const user = {
            password: "pwduser4"
        }

        request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('should return an error message for missing password', (done) => {
        const user = {
            email: "user4@gmail.com"
        }

        request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
})


/*const request = require('supertest');
const app = require('./index');

describe('/login', () => {
    it('should return a token and success message for valid credentials', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send({
                email: 'user4@gmail.com',
                password: 'pwduser4'
            });
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Login successful');
        expect(res.cookie.token).toBeDefined();
    })

    it('should return an error message for invalid credentials', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send({
                email: 'user@gmail.com',
                password: 'pwd'
            });
        
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return an error message for missing password', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send({
                email: 'user4@gmail.com'
            });
        
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Missing entries');
    });

    it('should return an error message for missing email', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send({
                password: 'pwduser4'
            })

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Missing entries');
    });

    it('should return aan error message for user not found', async () => {
        const res = request(app)
            .post('/api/user/login')
            .send({
                email: 'user8@gmail.com',
                password: 'pwduser8'
            })

        expect(res.status).toBe(401);
        expect((await res).body.message).toBe('User not found');
    });
        
});*/



