import { use } from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import server from "../index.js";

const chai = use(chaiHttp);
//const request = chai.request.execute;
chai.should();


describe('Add Task API', () => {
    let token;
    
    before(() => {
        token = jwt.sign({ userId: 4 }, process.env.SECRET_KEY, { expiresIn: "1h" });
    })

    it('should add a task when authenticated', (done) => {
        const task = {
            title: "Task 1",
            description: "Description 1",
            due_date: "2021-12-31",
            priority: "High",
            completed: 0
        }

        request(server)
            .post('/api/task/add')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.not.have.property('error')
                res.body.should.have.property('message').eq('Task created successfully.')
                done();
            })            
    })
})