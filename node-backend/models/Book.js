const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookSchema = new mongoose.Schema({
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }],
    title: {
        type: String,
        required: true
    },
    publication_year: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }

});


bookSchema.plugin(AutoIncrement, {
    inc_field: 'book',
    id: 'bookNums',
    start_seq: 100
});
module.exports = mongoose.model('Book', bookSchema);