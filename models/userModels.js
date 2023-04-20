const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"name is required"],
    },
    email: {
        type: String,
        required:[true,"email is required"],
    },
    password: {
        type: String,
        required:[true,"password is required"],
    },
    type: {
        type: String,
        default:"user"
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    },
    machine:{
        type: Array,
        default: []
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;