const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../data/users.json');

router.post('/register', (req, res) => {
    
    const { username, password } = req.body;

    const users = JSON.parse(
        fs.readFileSync(usersFile, 'utf-8')
    );

    const existingUser =users.find(
        user => user.username === username
    );

    if(existingUser){
        return res.status(400).json({
            message:"Username already exists"
        });
    }

    const newUser = {
    id: Date.now(),
    username,
    password
    };


    users.push(newUser);

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );

    res.status(201).json({
        message:"User registered successfully"
    });

});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(
        fs.readFileSync(usersFile, 'utf-8')
    );

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if(!user){
        return res.status(401).json({
            message:"Invalid credentials"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            username: user.username
        }
    });
});


module.exports = router;