const Travel = require("../model/travel");

const getAllTravel = async (req, res) => {
    try{
        const travel = await Travel.find({}).populate("category");
        res.status(201).json({message: `Бүх аялалын мэдээлэл.`, travel });
    }catch (error) {
        res.status(400).json({message: "Алдаа", error: error});
    };
};

const createTravel = async (req, res) => {
    const {title, travelImg, detail, category } = req.body;

    if(!title || !travelImg || !detail){
        res.status(400).json({message:'Нэр, тайлбар эсвэл зураг байхгүй байна.'});
    }

    try{
        const travel = await Travel.create({
            title,
            travelImg,
            detail,
            category
        });
        res.status(201).json({message: "Аялал амжилттай үүслээ.", travel });
    }catch (error) {
        res 
           .status(400)
           .json({message: "Аялал үүсгэхэд алдаа гарлаа.", error: error.message});
    }
};

const getTravel = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(400).json({message: `${id}-тэй аялал олдсонгүй.`});
    };

    try{
        const Travel = await Travel.findById(id);
        res.status(201).json({message: `${id}-тай аялал олдлоо.`, travel });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};
const uptadeTravel = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).json({message: `${id}-тэй аялал олдсонгүй.`});
    };

    try{
        const travel = await Travel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json({message: `${id}-тай аялалыг шинэчиллээ.`, travel });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};
const deleteTravel = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).json({message: `${id}-тэй аялал олдсонгүй.`});
    };

    try{
        const travel = await Travel.findByIdAndDelete(id);
        res.status(201).json({message: `${id}-тай аялалыг устгалаа.`, travel });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};

module.exports = { createTravel, getAllTravel, getTravel, uptadeTravel, deleteTravel};