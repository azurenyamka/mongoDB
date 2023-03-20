const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB');
const colors = require('colors');
const userRoutes = require("./routes/userRoutes");
const logger = require('./logger/logger');


dotenv.config();

const PORT = process.env.PORT;
const dbURL = process.env.DATABASE_URI;

// instance of express

const app = express();

app.use(express.json());
app.use(logger);

app.use("/users", userRoutes)

app.get('/', (req, res)=>{
    res.json({message:'Hi'});
})

connectDB(dbURL);
app.listen(PORT,()=>{
    console.log(`Cервер ${PORT} порт дээр аслаа`.rainbow);
});
