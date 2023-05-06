const machineModel = require('../models/machineModels');
const applyControllerModel = require('../models/controllerApplicationModels');
const applyMachineModel = require('../models/machineApplication');
const userModel = require('../models/userModels')


const addMachineController = async(req,res) =>{
    try {
        const existingMachine = await machineModel.findOne({name:req.body.name,typeofequip:req.body.typeofequip,typeofmachine:req.body.typeofmachine,typeofop:req.body.typeofop})
        if(existingMachine){
            return res.status(200).send({message:'Machine Already Exist',success:false})
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
        machineId:req.body.machId
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
    // console.log(req.body.machId)
    const machine = await machineModel.findOne({_id:req.body.machId})
    // const sd=machine.sampledetails
    // console.log(machine)
    const sds=machine.sampledetails;
    return res.status(200).send({
      success: true,
      message: "Sample Details Fetched Successfully",
      sds,
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

const applyForMachine = async(req,res)=>{
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
    const appl = {...req.body}
    // console.log(appl);
    // console.log('here')
    const existingapplication = await applyMachineModel.findOne({name:appl.name,typeofequip:appl.typeofequip,typeofmachine:appl.typeofmachine,typeofop:appl.typeofop,nameofthemachine:appl.nameofthemachine,phone:appl.phone,designation:appl.designation,institution:appl.institution,from:appl.from,date:appl.date,to:appl.to});
    // console.log('here1')
      if(existingapplication){
          return res.status(200).send({message:'Application Already Exist',success:false})
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
}

const getbillamount = async(req,res)=>{
  try {
    // console.log(req.body.machId)
    const machine = await machineModel.findOne({_id:req.body.machId})
    // const sd=machine.sampledetails
    console.log(machine)
    const sds=req.body.utype === '1' ? machine.billcharge1 : req.body.utype === '2' ? machine.billcharge2 : machine.billcharge3;

    return res.status(200).send({
      success: true,
      message: "Sample Details Fetched Successfully",
      sds,
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

const applyForSD = async(req,res)=>{
  try {
    const machine = await machineModel.find({_id:req.body.machId});
    // console.log(machine[0].name);

    var sde = [];

    machine[0].sampledetails.map((item)=>{
      sde.push({ind:item,val:req.body[item]})
    })

    // console.log(sde);

    const appl = {
      name:req.body.name,
      phone:req.body.phone,
      designation:req.body.designation,
      institution:req.body.institution,
      supervisor:req.body.supervisor,
      gst:req.body.gst,
      usertype:req.body.usertype,
      from:req.body.from,
      date:req.body.date,
      to:req.body.to,
      sampledetails:sde,
      nameofthemachine:machine[0].name,
      typeofmachine:machine[0].typeofmachine,
      typeofequip:machine[0].typeofequip,
      typeofop:machine[0].typeofop,
      userId:req.body.userID,
    }

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
}

const editMachineController = async(req,res) =>{
  try {
      const existingMachine = await machineModel.findOneAndUpdate({name:req.body.name,typeofequip:req.body.typeofequip,typeofmachine:req.body.typeofmachine,typeofop:req.body.typeofop},req.body)

      // console.log(req.body);
      // const newMachine = new machineModel(req.body);
      // await newMachine.save();

      res.status(201).send({
          message:'Machine Edited Successfully',
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

module.exports = {addMachineController,getAllMachinesController,applyforController,getSampleDetails,applyForMachine,getbillamount,applyForSD,editMachineController};