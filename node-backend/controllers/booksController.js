const Book = require('../models/Book');
const Author = require('../models/Author');

const asyncHandler = require('express-async-handler');

//GET
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().select().lean();
    if(!books?.length){
        return res.status(400).json({message: 'No books found'});
    }
    res.json(books);
});

//POST
const addNewBook = asyncHandler(async (req, res) => {
    const { authors, title, publication_year, language, pages, price } = req.body;

    if(!title || !publication_year || !language || !pages || !price){
        return res.status(400).json({message: 'Field(s) cannot be empty'});
    }

    const duplicate = await Book.findOne({ title }).lean().exec();

    if(duplicate){
        return res.status(409).json({message: 'Already have that book title'});
    }

    const bookObject = { authors, title, publication_year, language, pages, price };
    

    const book = await Book.create(bookObject);

    if(book){
        res.status(201).json({message: `New book ${title} created`});
    }else{
        res.status(400).json({message: 'Invalid book data received'});
    }

});

//PATCH/PUT
const updateBook = asyncHandler(async (req, res) => {
    const { authors, title, publication_year, language, pages, price } = req.body;

    if(!id || !title || !publication_year || !language || !pages || !price || authors.length <= 0){
        return res.status(400).json({message: 'All fields are required'});
    }

    const book = await Book.findById(id).exec();
    if(!book){
        return res.status(400).json({message: 'Book not found'});
    }

    const duplicate = await Book.findOne({title}).lean().exec();
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate book'});
    }

    book.authors = authors;
    book.title = title;
    book.publication_year = publication_year;
    book.language = language;
    book.pages = pages;
    book.price = price;
    
    const updatedBook = await book.save();

    res.json({message: `Updated ${updatedBook.title}`});

});

//DELETE
const deleteBook = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message: 'Book ID is required'});
    }

    const book = await Book.findById(id).exec();
    if(!book){
        return res.status(400).json({message: 'Book not found'});
    }

    const result = await book.deleteOne();

    const reply = `Book ${result.title} with ID ${resut._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllBooks,
    addNewBook,
    updateBook,
    deleteBook
}