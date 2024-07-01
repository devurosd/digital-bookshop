const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    total: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


orderSchema.plugin(AutoIncrement, {
    inc_field: 'order',
    id: 'orderNums',
    start_seq: 100
});
module.exports = mongoose.model('Order', orderSchema);