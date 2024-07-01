const User = require('../models/User');
const Order = require('../models/Order');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//GET
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        return res.status(400).json({message: 'No users found'});
    }
    res.json(users);
});

//POST
const addNewUser = asyncHandler(async (req, res) => {
    const { orders, name, surname, username, password, isAdmin } = req.body;

    if(!name || !surname || !username || !password){
        return res.status(400).json({message: 'Field(s) cannot be empty'});
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate){
        return res.status(409).json({message: 'Username already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { orders, name, surname, username, "password": hashedPassword, isAdmin };
    

    const user = await User.create(userObject);

    if(user){
        res.status(201).json({message: `New user ${username} created`});
    }else{
        res.status(400).json({message: 'Invalid user data received'});
    }

});

//PATCH/PUT
const updateUser = asyncHandler(async (req, res) => {
    const { id, orders, name, surname, username, password, isAdmin } = req.body;

    if(!id || !name || !surname || !username || typeof isAdmin !== 'boolean'){
        return res.status(400).json({message: 'All fields are required'});
    }

    const user = await User.findById(id).exec();
    if(!user){
        return res.status(400).json({message: 'User not found'});
    }

    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'});
    }

    user.username = username;
    user.name = name;
    user.surname = surname;

    if(password){
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({message: `Updated ${updatedUser.username}`});

});

//DELETE
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message: 'User ID is required'});
    }

    const user = await User.findById(id).exec();
    if(!user){
        return res.status(400).json({message: 'User not found'});
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${resut._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllUsers,
    addNewUser,
    updateUser,
    deleteUser
}