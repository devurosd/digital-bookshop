const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const authorSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});

authorSchema.plugin(AutoIncrement, {
    inc_field: 'author',
    id: 'authorNums',
    start_seq: 100
});
module.exports = mongoose.model('Author', authorSchema);
