const Category = require('../model/category');

const getAllCategory = async (req, res) => {
    try{
        const categories = await Category.find({});
        res.status(201).json({message: `Бүх категорийн мэдээлэл.`, categories });
    }catch (error) {
        res.status(400).json({message: "Алдаа", error: error});
    };
};

const createCategory = async (req, res) => {
    const {title, description, categoryImg } = req.body;

    console.log("Title", title)
    console.log("desc", description)
    console.log("Title", categoryImg)

    if(!title || !description || !categoryImg){
        res.status(400).json({message:'Нэр, тайлбар эсвэл зураг байхгүй байна.'});
    }

    try{
        const category = await Category.create({
            title,
            description,
            categoryImg
        });
        res.status(201).json({message: "Категори амжилттай үүслээ.", category });
    }catch (error) {
        res 
           .status(400)
           .json({message: "Категори үүсгэхэд алдаа гарлаа.", error: error.message});
    }
};

const getCategory = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(400).json({message: `${id}-тэй категори олдсонгүй.`});
    };

    try{
        const category = await Category.findById(id);
        res.status(201).json({message: `${id}-тай категори олдлоо.`, category });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};
const uptadeCategory = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).json({message: `${id}-тэй категори олдсонгүй.`});
    };

    try{
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json({message: `${id}-тай категорийг шинэчиллээ.`, category });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};
const deleteCategory = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).json({message: `${id}-тэй категори олдсонгүй.`});
    };

    try{
        const category = await Category.findByIdAndDelete(id);
        res.status(201).json({message: `${id}-тай категорийг устгалаа.`, category });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};

module.exports = { createCategory, getAllCategory, getCategory, uptadeCategory, deleteCategory};