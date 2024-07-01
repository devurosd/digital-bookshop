
const Author = require('../models/Author');

const asyncHandler = require('express-async-handler');

//GET
const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find().select().lean();
    if(!authors?.length){
        return res.status(400).json({message: 'No authors found'});
    }
    res.json(authors);
});

//POST
const addNewAuthor = asyncHandler(async (req, res) => {
    const { name, surname } = req.body;

    if(!name || !surname){
        return res.status(400).json({message: 'Field(s) cannot be empty'});
    }

    const authorObject = { name, surname };
    
    const author = await Author.create(authorObject);

    if(author){
        res.status(201).json({message: `New author ${name}, ${surname} is created`});
    }else{
        res.status(400).json({message: 'Invalid author data received'});
    }
});

//PATCH/PUT
const updateAuthor = asyncHandler(async (req, res) => {
    const { name, surname } = req.body;

    if(!name || !surname){
        return res.status(400).json({message: 'Field(s) cannot be empty'});
    }

    const author = await Author.findById(id).exec();
    if(!author){
        return res.status(400).json({message: 'Author not found'});
    }

    //author.books = books;
    author.name = name;
    author.surname = surname;
        
    const updatedAuthor = await author.save();

    res.json({message: `Updated ${updatedAuthor._id} author`});

});

//DELETE
const deleteAuthor = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message: 'Author ID is required'});
    }

    const author = await Author.findById(id).exec();
    if(!author){
        return res.status(400).json({message: 'Author not found'});
    }

    const result = await author.deleteOne();

    const reply = `Author with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllAuthors,
    addNewAuthor,
    updateAuthor,
    deleteAuthor
}