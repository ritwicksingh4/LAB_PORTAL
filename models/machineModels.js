const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of the machine is required']
    },
    typeofmachine:{
        type:String,
        required:[true,'type of the machine is required']
    },
    typeofequip:{
        type:String,
        required:[true,'type of the equipment is required']
    },
    typeofop:{
        type:String,
        required:[true,'type of the operation is required']
    },
    holidays:{
        type:Array,
        default:[]
    },
    sampledetails:{
        type:Array,
        default:[]
    },
    billcharge1:{
        type:String,
        required:[true,'type of the operation is required']
    },
    billcharge2:{
        type:String,
        required:[true,'type of the operation is required']
    },
    billcharge3:{
        type:String,
        required:[true,'type of the operation is required']
    },
},{timestamps:true});

const machineModel = mongoose.model('machine',machineSchema);
module.exports = machineModel;