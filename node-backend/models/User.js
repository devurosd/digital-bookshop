const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Order'
    }],
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


userSchema.plugin(AutoIncrement, {
    inc_field: 'user',
    id: 'userNums',
    start_seq: 100
});
module.exports = mongoose.model('User', userSchema);