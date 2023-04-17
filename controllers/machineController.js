const machineModel = require('../models/machineModels');
const applyControllerModel = require('../models/controllerApplicationModels');


const addMachineController = async(req,res) =>{
    try {
        const existingMachine = await machineModel.findOne({name:req.body.name,typeofequip:req.body.typeofequip,typeofmachine:req.body.typeofmachine,typeofop:req.body.typeofop})
        if(existingMachine){
            return res.status(200).send({message:'Machine Already Exist',success:false})
        }

        // console.log(req.body);
        const newMachine = new machineModel(req.body);
        await newMachine.save();

        res.status(201).send({
            message:'Machine Registered Successfully',
            success:true
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Machine Controller ${error.message}`
        })
    }
}

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
      const machine = await machineModel.find({_id:req.body.machId});
      // console.log(machine[0].name);
      const appl = {
        name:req.body.name,
        phone:req.body.phone,
        designation:req.body.designation,
        someotherproof:req.body.proof,
        nameofthemachine:machine[0].name,
        typeofmachine:machine[0].typeofmachine,
        typeofequip:machine[0].typeofequip,
        typeofop:machine[0].typeofop,
        userId:req.body.userID,
      }

      // console.log(appl);
      // console.log('here')
      const existingapplication = await applyControllerModel.findOne({name:appl.name,typeofequip:appl.typeofequip,typeofmachine:appl.typeofmachine,typeofop:appl.typeofop,nameofthemachine:appl.nameofthemachine,phone:appl.phone,designation:appl.designation,someotherproof:appl.someotherproof});
      // console.log('here1')
        if(existingapplication){
            return res.status(200).send({message:'Application Already Exist',success:false})
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

const getSampleDetails = async(req,res)=>{
  try {
    console.log(req.body.machId)
    const machine = await machineModel.findOne({_id:req.body.machId})
    // const sd=machine.sampledetails
    console.log(machine)
    // const sds=[];
    res.status(200).send({
      success: true,
      message: "Sample Details Fetched Successfully",
    })
  } catch (error) {
    console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in loading sample details",
      });
  }
}

module.exports = {addMachineController,getAllMachinesController,applyforController,getSampleDetails};