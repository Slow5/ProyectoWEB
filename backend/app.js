const express = require('express');
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const app = express();
const path = require('path');

const postRoute = require("./routes/posts");

mongoose.connect("mongodb+srv://slow:612002@proyecto.3ipyamx.mongodb.net/proyecto")

.then(()=>{ 
    console.log('Base de datos conectada');
})
.catch(()=>{
    console.log('Base de datos no conectada');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/images", express.static(path.join("backend/images")));

    app.use((req, res, next) =>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
        next();
    });

app.use("/api", postRoute);

module.exports = app;
