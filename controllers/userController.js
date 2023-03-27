const User = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(201).json({message: `Бүх хэрэглэгчийн мэдээлэл.`, users });
    }catch (error) {
        res.status(400).json({message: "Алдаа", error: error});
    };
};

const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({message:'Нэр, имэйл эсвэл нууц үг байхгүй байна.'});
    }
    const jwtToken = jwt.sign()
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({message: "Амжилттай бүртгэгдлээ", user });
    }catch (error) {
        res 
           .status(400)
           .json({message: "Бүртгэл амжилтгүй боллоо.", error: error.message});
    }
};

const getUser = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(400).json({message: `${id}-тэй хэрэглэгч олдсонгүй.`});
    };

    try{
        const user = await User.findById(id);
        res.status(201).json({message: `${id}-тай хэрэглэгч олдлоо.`, user });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};
const uptadeUser = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).json({message: `${id}-тэй хэрэглэгч олдсонгүй.`});
    };

    try{
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json({message: `${id}-тай хэрэглэгчийг шинэчиллээ.`, user });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};
const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).json({message: `${id}-тэй хэрэглэгч олдсонгүй.`});
    };

    try{
        const user = await User.findByIdAndDelete(id);
        res.status(201).json({message: `${id}-тай хэрэглэгчийг устгалаа.`, user });
    }catch(error) {
        res.status(400).json({message: "Алдаа", error: error.message});
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    

    try{
        const user = await User.findOne({ email }).select("+password");
        console.log("user data:", user);
        console.log(req.body);
        if(!user){
            console.log("ggg")
            return res.status(400).json({message:`Имэйл эсвэл нууц үг буруу байна.`})
            
        }
        const checkPass = bcrypt.compareSync(password, user.password);
        console.log(checkPass);
        if(!checkPass){
            console.log("bbbb")
            return res.status(400).json({message:`Имэйл эсвэл нууц үг буруу байна.`});

        }
        else {
            console.log("амжтлттаa")
            res.status(200).json({message:`Амжилттай нэвтэрлээ.`, user});}
    }catch(error){
        next(error);
    }
    
};
const register = async (req, res, next) => {
    const {name, email, password} = req.body;
    

    try{
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
console.log(user);
        res.status(200).json({message:`Амжилттай бүртгэлээ.`, user});
    }catch(error){
        next(error);
    }
    
};


module.exports = { createUser, getAllUsers, getUser, uptadeUser, deleteUser, login, register }