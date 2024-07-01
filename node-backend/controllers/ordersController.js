const Order = require('../models/Order');
const Author = require('../models/Author');

const asyncHandler = require('express-async-handler');

//GET
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().select().lean();
    if(!orders?.length){
        return res.status(400).json({message: 'No orders found'});
    }
    res.json(orders);
});

//POST
const addNewOrder = asyncHandler(async (req, res) => {
    const { books, user, total } = req.body;

    if(books.length <= 0 || !user || !total){
        return res.status(400).json({message: 'Field(s) cannot be empty'});
    }

    const orderObject = { books, user, total };
    
    const order = await Order.create(orderObject);

    if(order){
        res.status(201).json({message: `New order - total: ${total} created`});
    }else{
        res.status(400).json({message: 'Invalid order data received'});
    }

});

//PATCH/PUT
const updateOrder = asyncHandler(async (req, res) => {
    const { books, user, total } = req.body;

    if(books.length <= 0 || !user || !total){
        return res.status(400).json({message: 'Field(s) cannot be empty'});
    }

    const order = await Order.findById(id).exec();
    if(!order){
        return res.status(400).json({message: 'Order not found'});
    }

    order.books = books;
    order.user = user;
    order.total = total;
        
    const updatedOrder = await order.save();

    res.json({message: `Updated ${updatedOrder._id} order`});

});

//DELETE
const deleteOrder = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message: 'Order ID is required'});
    }

    const order = await Order.findById(id).exec();
    if(!order){
        return res.status(400).json({message: 'Order not found'});
    }

    const result = await order.deleteOne();

    const reply = `Order with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllOrders,
    addNewOrder,
    updateOrder,
    deleteOrder
}