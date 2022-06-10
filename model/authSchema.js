const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        min: 8,
        max: 34,
    },
},

{timestamps: true}
)

module.exports = mongoose.model('User',userSchema);