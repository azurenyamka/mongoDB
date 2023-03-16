const mongoose = require('mongoose');



const connectDB = async (dbURL) => {
    try {
        await mongoose.connect(dbURL);
        console.log("MongoDB -тэй холбогдлоо");
    }catch (err) {
        console.log("MongoDB -тэй холбогдох үед алдаа гарлаа:", err);
    }
};

module.exports = connectDB