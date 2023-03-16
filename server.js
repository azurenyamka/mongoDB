const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB');
const colors = require('colors');

dotenv.config();

const PORT = process.env.PORT;
const dbURL = process.env.DATABASE_URI;

// instance of express
const app = express();

app.get('/', (req, res)=>{
    res.json({message:'Hi'});
})

connectDB(dbURL);
app.listen(PORT,()=>{
    console.log(`Cервер ${PORT} порт дээр аслаа`.rainbow);
});
