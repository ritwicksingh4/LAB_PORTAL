const mongoose = require('mongoose');

const controllerApplicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of the machine is required']
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    designation:{
        type:String,
        required:[true,'Designation is required']
    },
    someotherproof:{
        type:String,
        required:[true,'Some other proof is required']
    },
    nameofthemachine:{
        type:String,
        required:[true,'Some other proof is required']
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
    userId:{
        type:String,
    }
},{timestamps:true});

const controllerApplicationModel = mongoose.model('controllerApplication',controllerApplicationSchema);
module.exports = controllerApplicationModel;