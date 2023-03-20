const User = require('../model/user');

const getAllUsers = (req, res) => {};

const createUser = async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    res.status(201).json({message: "Амжилттай бүртгэгдлээ", user });
};

module.exports = { createUser, getAllUsers }