const machineModel = require('../models/machineModels');
const applyControllerModel = require('../models/controllerApplicationModels');
const applyMachineModel = require('../models/machineApplication');
const userModel = require('../models/userModels')
const machineApplicationModel = require("../models/machineApplication");
const moment = require("moment");
const fs= require('fs');
const path= require('path');

const addMachineController = async (req, res) => {
    try {
        const existingMachine = await machineModel.findOne({
            name: req.body.name,
            typeofequip: req.body.typeofequip,
            typeofmachine: req.body.typeofmachine,
            typeofop: req.body.typeofop,
        });
        if (existingMachine) {
            return res
                .status(200)
                .send({ message: "Machine Already Exist", success: false });
        }

        // console.log(req.body);
        const newMachine = new machineModel(req.body);
        await newMachine.save();
        // const upmach = req.body.machine;
        // console.log(upmach);
        // upmach.push(newMachine._id)
        const user = await userModel.findOne({_id:req.body.userId})
        console.log(user)
        user.machine.push(newMachine._id)
        await user.save()

        res.status(201).send({
            message: "Machine Registered Successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Machine Controller ${error.message}`,
        });
    }
};

const getAllMachinesController = async (req, res) => {
    try {
        const machine = await machineModel.find();
        res.status(200).send({
            success: true,
            message: "Machines List Fetched Successfully",
            data: machine,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Fetching Machines List",
        });
    }
};

const applyforController = async (req, res) => {
    try {
        const machine = await machineModel.find({ _id: req.body.machId });
        // console.log(machine[0].name);
        const appl = {
            name: req.body.name,
            phone: req.body.phone,
            designation: req.body.designation,
            someotherproof: req.body.proof,
            nameofthemachine: machine[0].name,
            typeofmachine: machine[0].typeofmachine,
            typeofequip: machine[0].typeofequip,
            typeofop: machine[0].typeofop,
            userId: req.body.userID,
            machineId: req.body.machId,
        };

        // console.log(appl);
        // console.log('here')
        const existingapplication = await applyControllerModel.findOne({
            name: appl.name,
            typeofequip: appl.typeofequip,
            typeofmachine: appl.typeofmachine,
            typeofop: appl.typeofop,
            nameofthemachine: appl.nameofthemachine,
            phone: appl.phone,
            designation: appl.designation,
            someotherproof: appl.someotherproof,
        });
        // console.log('here1')
        if (existingapplication) {
            return res
                .status(200)
                .send({ message: "Application Already Exist", success: false });
        }
        // console.log('here2')
        // console.log(req.body);
        const newApplication = new applyControllerModel(appl);
        await newApplication.save();
        // console.log('here3')
        res.status(200).send({
            success: true,
            message: "Applied Successfully",
            data: machine,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Applying",
        });
    }
};

const getUniqueTypesController = async (req, res) => {
    try {
        const uniqueValues = await machineModel
            .distinct("typeofmachine")
            .exec();
        // console.log(uniqueValues);

        res.status(200).send({
            success: true,
            message: "Unique Types List Fetched Successfully",
            data: uniqueValues,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Fetching Unique Types List",
        });
    }
};

const getMachinesByTypeController = async (req, res) => {
    try {
        const type = req.body.body.type;
        const machines = await machineModel
            .distinct("typeofequip", { typeofmachine: type })
            .exec();

        res.status(200).send({
            success: true,
            message: `Machines with typeofmachine ${type} fetched successfully`,
            data: machines,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `Error while fetching machines with typeofmachine ${type}`,
        });
    }
};

const getMachinesByEquipController = async (req, res) => {
    try {
        const type = req.body.body.type;
        const equip = req.body.body.equiptype;
        const machines = await machineModel
            .distinct("typeofop", {
                typeofmachine: type,
                typeofequip: equip,
            })
            .exec();

        res.status(200).send({
            success: true,
            message: `Machines with typeofmachine ${type} fetched successfully`,
            data: machines,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `Error while fetching machines with typeofmachine ${type}`,
        });
    }
};

const getMachinesByOpController = async (req, res) => {
    try {
        const type = req.body.body.type;
        const equip = req.body.body.equiptype;
        const op = req.body.body.optype;

        console.log(type, equip, op);
        const machines = await machineModel.find({
            typeofmachine: type,
            typeofequip: equip,
            typeofop: op,
        });

        res.status(200).send({
            success: true,
            message: `Machines with typeofmachine ${type} fetched successfully`,
            data: machines,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `Error while fetching machines with typeofmachine ${type}`,
        });
    }
};

const getMachineByIdController = async (req, res) => {
    try {
        const machineId = req.body.body.machineId;

        const machines = await machineModel.find({
            _id: machineId,
        });

        res.status(200).send({
            success: true,
            message: `Machine with id fetched successfully`,
            data: machines,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `Error while fetching machines with id `,
        });
    }
};

const getSampleDetails = async (req, res) => {
    try {
        // console.log(req.body.machId)
        const machine = await machineModel.findOne({ _id: req.body.machId });
        // const sd=machine.sampledetails
        // console.log(machine)
        const sds = machine.sampledetails;
        return res.status(200).send({
            success: true,
            message: "Sample Details Fetched Successfully",
            sds,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in loading sample details",
        });
    }
};

const applyForMachine = async (req, res) => {
    try {
        // const machine = await machineModel.find({_id:req.body.machId});
        // // console.log(machine[0].name);

        // var sde = [];

        // machine[0].sampledetails.map((item)=>{
        //   sde.push({ind:item,val:req.body[item]})
        // })

        // console.log(sde);

        // const appl = {
        //   name:req.body.name,
        //   phone:req.body.phone,
        //   designation:req.body.designation,
        //   institution:req.body.institution,
        //   supervisor:req.body.supervisor,
        //   gst:req.body.gst,
        //   usertype:req.body.usertype,
        //   from:req.body.from,
        //   date:req.body.date,
        //   to:req.body.to,
        //   sampledetails:sde,
        //   nameofthemachine:machine[0].name,
        //   typeofmachine:machine[0].typeofmachine,
        //   typeofequip:machine[0].typeofequip,
        //   typeofop:machine[0].typeofop,
        //   userId:req.body.userID,
        // }

// for img
// var obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//         contentType: 'image/png'
//     }
// }
// imgSchema.create(obj)
// .then ((err, item) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         // item.save();
//         res.redirect('/');
//     }
// });
//

        const appl = { 
            ...req.body,
        };
        // console.log(appl);
        // console.log('here')
        const existingapplication = await applyMachineModel.findOne({
            name: appl.name,
            typeofequip: appl.typeofequip,
            typeofmachine: appl.typeofmachine,
            typeofop: appl.typeofop,
            nameofthemachine: appl.nameofthemachine,
            phone: appl.phone,
            designation: appl.designation,
            institution: appl.institution,
            from: appl.from,
            date: appl.date,
            to: appl.to,
        });
        // console.log('here1')
        if (existingapplication) {
            return res
                .status(200)
                .send({ message: "Application Already Exist", success: false });
        }
        // console.log('here2')
        // console.log(req.body);
        const newApplication = new applyMachineModel(appl);
        await newApplication.save();
        // console.log('here3')
        res.status(200).send({
            success: true,
            message: "Applied Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Applying",
        });
    }
};

const getbillamount = async (req, res) => {
    try {
        // console.log(req.body.machId)
        const machine = await machineModel.findOne({ _id: req.body.machId });
        // const sd=machine.sampledetails
        console.log(machine);
        const sds =
            req.body.utype === "1"
                ? machine.billcharge1
                : req.body.utype === "2"
                ? machine.billcharge2
                : machine.billcharge3;

        return res.status(200).send({
            success: true,
            message: "Sample Details Fetched Successfully",
            sds,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in loading sample details",
        });
    }
};

const applyForSD = async (req, res) => {
    try {
        const machine = await machineModel.find({ _id: req.body.machId });
        // console.log(machine[0].name);

        var sde = [];

        machine[0].sampledetails.map((item) => {
            sde.push({ ind: item, val: req.body[item] });
        });

        // console.log(sde);

        const appl = {
            name: req.body.name,
            phone: req.body.phone,
            designation: req.body.designation,
            institution: req.body.institution,
            supervisor: req.body.supervisor,
            gst: req.body.gst,
            usertype: req.body.usertype,
            from: req.body.from,
            date: req.body.date,
            to: req.body.to,
            sampledetails: sde,
            nameofthemachine: machine[0].name,
            typeofmachine: machine[0].typeofmachine,
            typeofequip: machine[0].typeofequip,
            typeofop: machine[0].typeofop,
            userId: req.body.userID,
        };

        res.status(200).send({
            success: true,
            message: "Applied Successfully",
            data: appl,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Applying",
        });
    }
};

const editMachineController = async (req, res) => {
    try {
        const existingMachine = await machineModel.findOneAndUpdate(
            {
                name: req.body.name,
                typeofequip: req.body.typeofequip,
                typeofmachine: req.body.typeofmachine,
                typeofop: req.body.typeofop,
            },
            req.body
        );

        // console.log(req.body);
        // const newMachine = new machineModel(req.body);
        // await newMachine.save();

        res.status(201).send({
            message: "Machine Edited Successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Machine Controller ${error.message}`,
        });
    }
};

const bookingAvailabilityController = async (req, res) => {
    try {
        // const date = moment(req.body.date, "DD-MM-YY").toISOString();
        // const fromTime = moment(req.body.time, "HH:mm")
        //     .subtract(1, "hours")
        //     .toISOString();
        // const toTime = moment(req.body.time, "HH:mm")
        //     .add(1, "hours")
        //     .toISOString();
        const date=req.body.date;
        const fromTime=req.body.fromTime;
        const toTime=req.body.toTime;
        const machineId = req.body.machineId;
        const appointments1 = await machineApplicationModel.find({
            machineId,
            date,
            from: { $lte: toTime},
            to: { $gte: toTime },
        });
        const appointments2 = await machineApplicationModel.find({
            machineId,
            date,
            from: { $lte: fromTime},
            to: { $gte: fromTime },
        });
        console.log(date,fromTime,toTime,machineId)
        if (appointments1.length > 0 || appointments2.length > 0) {
            return res.status(200).send({
                message: "Appointments not Availibale at this time",
                success: false,
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Appointments available",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Booking",
        });
    }
};

module.exports = {
    addMachineController,
    getAllMachinesController,
    applyforController,
    getSampleDetails,
    applyForMachine,
    getbillamount,
    applyForSD,
    editMachineController,
    getUniqueTypesController,
    getMachinesByTypeController,
    getMachinesByEquipController,
    getMachinesByOpController,
    getMachineByIdController,
    bookingAvailabilityController,
};
