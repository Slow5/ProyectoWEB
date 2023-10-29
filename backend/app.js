const express = require('express');
const bodyParser = require("body-parser"); 
const User = require('./models/User');
const mongoose = require("mongoose");
const app = express();
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://slow:612002@proyecto.3ipyamx.mongodb.net/proyecto")

.then(()=>{ 
    console.log('Base de datos conectada');
})
.catch(()=>{
    console.log('Base de datos no conectada');
});

app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));


    app.use((req, res, next) =>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
        res.setHeader("Access.Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
        next();
    });

//app para mandar datos 
app.post('/api/signup', async (req, res) =>{
    const {email, password} = req.body;
    const newUser = new User({email, password});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id }, 'secretkey')
    res.status(200).json({token})
});

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    
    if(!user) return res.status(401).send("the email doesn't exists");
    if(user.password !== password) return res.status(401).send('wrong Password');

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
})

function verifyToken(req, res, next){
   if(!req.headers.authorization){
    return res.status(401).send('Unthorize Request');
   }

   const token = req.headers.authorization.split(' ')[1]
   if(token === 'null'){
    return res.status(401).send("Unathorize Request");
   }
   const payload = jwt.verify(token, 'secretKey')
   req.userId = payload._id;
   next();
}

module.exports = app;