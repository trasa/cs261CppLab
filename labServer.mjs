const port = 25000;

import uuid4 from 'uuid4';
import express from 'express';
const app = express();
app.use(express.json());

let users = 
{
    "user1" : "password1"
};

let sessions = {};

app.get('/lab', (req, res) => {
    console.log("Received simple-hello request");
    res.send({ message : "Hello!" });
});

app.post('/lab/login', (req, res) => {
    console.log("Received POST /lab/login");
    if ((req.body.username == undefined) || (users[req.body.username] == undefined)) {
        res.sendStatus(404);
        return;
    }
    if ((req.body.password == undefined) || (users[req.body.username] != req.body.password)) {
        res.sendStatus(401);
        return;
    }
    let session = uuid4();
    sessions[session] = req.body.username;
    res.send(
        {
            "username" : req.body.username,
            "session" : session
        });
});

app.get('/lab/users', (req, res) => 
{
    console.log("Received GET /lab/users");
    if ((req.query.session == undefined) || (sessions[req.query.session] == undefined)) {
        res.sendStatus(403);
        return;
    }
    res.send(users);
})

app.listen(port, () => {
    console.log(`CS 261 Lab Server, listening on port ${port}...`);
})
