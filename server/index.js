require('dotenv').config()

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

const port = process.env.PORT || 3000;
const start = async () =>{
    try{
        await mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(port, () => {
            console.log(`Запустился ${port}`)})
    }catch(err){
        console.log(err)
    }
}

// start
start()