const mongoose = require('mongoose');

const machineApplicationSchema = new mongoose.Schema({
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
    institution:{
        type:String,
        required:[true,'Institution name is required']
    },
    supervisor:{
        type:String,
        required:[true,'Supervisor name is required']
    },
    gst:{
        type:String,
        required:[true,'GST registration no. is required']
    },
    usertype:{
        type:String,
        required:[true,'type of the user is required']
    },
    date:{
        type:String,
        required:[true,'date of appointment is required']
    },
    from:{
        type:String,
        required:[true,'start time is required']
    },
    to:{
        type:String,
        required:[true,'end time is required']
    },
    sampledetails:{
        type:Array,
        default:[]
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
    },
    status:{
        type:String,
        default:'pending'
    },
    machineId:{
        type:String
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
},{timestamps:true});

const machineApplicationModel = mongoose.model('machineApplication',machineApplicationSchema);
module.exports = machineApplicationModel;