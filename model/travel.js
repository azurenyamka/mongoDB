const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [255, "Тайлбар хамгийн ихдээ 255 тэмдэгтээс ихгүй байна."],
    },
    description: {
        type: String,
        maxlength: [500, "Тайлбар хамгийн ихдээ 500 тэмдэгтээс ихгүй байна."],
    },
    travelImg: {
        type: String,
    },
    travelPrice: {
        type: Number,
    },
    travelLocation: String,
    traveDay: Number,
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
});
const travel = mongoose.model("Travel", travelSchema);
module.exports = travel;