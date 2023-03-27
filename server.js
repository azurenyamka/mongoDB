const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require("cors")
const connectDB = require('./config/mongoDB');
const colors = require('colors');
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const travelRoutes = require("./routes/travelRoutes");
const logger = require('./middlewares/logger');
const path = require("path");



dotenv.config();

// const upload = multer({dest:"uploads/"});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = Math.floor(Math.random() * 1_000_000).toString(16)
        cb(null, `${filename}${fileExt}`);
    }
});
const upload = multer({storage: storage});

const PORT = process.env.PORT;
const dbURL = process.env.DATABASE_URI;

// instance of express

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/uploads", express.static("uploads"));
app.use("/travels", travelRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

app.get('/', (req, res)=>{
    res.json({message:'Hi'});
});

app.post("/uploads", upload.single("image"), (req, res) => {
    console.log("Req:", req.file)
    res.status(200).json({message: "Амжилттай хадгаллаа.", imageURL:`${req.protocol}://${req.hostname}:${PORT}/${req.file.path}` });
});

connectDB(dbURL);
app.listen(PORT,()=>{
    console.log(`Cервер ${PORT} порт дээр аслаа`.rainbow);
});
