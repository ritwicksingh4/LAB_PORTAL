const userModel = require('../models/userModels');
const applyMachineModel = require('../models/machineApplication')
const ctrlModel = require('../models/controllerApplicationModels')
const machineModel = require('../models/machineModels')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res
                .status(200)
                .send({ message: "User Already Exist", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();

        // for direct login
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // console.log(token);

        res.status(201).send({
            message: "Registered Successfully",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
};

// login callback

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invalid email or password", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).send({
            message: "Login Successful",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Error in login controller ${error.message}`,
        });
    }
};

const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
        });
    }
};

const userAppointmentsController = async (req, res) => {
    try {
      const appointments = await applyMachineModel.find({
        userId: req.body.userId,
      });
      res.status(200).send({
        success: true,
        message: "Users Appointments Fetch SUccessfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In User Appointments",
      });
    }
  };

  const getAllAppsController = async (req, res) => {
    try {
        const Apps = await applyMachineModel.find({});
        res.status(200).send({
          success: true,
          message: "Machine Applications Data list",
          data: Apps,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while getting machine applications data",
          error,
        });
      }
  };

  const ApplicationsController = async(req,res)=>{
    try {
        const Apps = await applyMachineModel.find({_id:req.body.appId});
        console.log(Apps[0])
        res.status(200).send({
          success: true,
          message: "Application data fetched successfully",
          data: Apps[0],
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while getting application data",
          error,
        });
      }
  }

  const ChangeStatusController = async(req,res)=>{
    try {
        let Apps = await applyMachineModel.find({_id:req.body.appId});
        Apps[0].status=req.body.status
        console.log(Apps[0]);
        await Apps[0].save()
        // var appli = new applyMachineModel({...Apps[0],status:req.body.status})
        // await appli.save()
        res.status(200).send({
          success: true,
          message: "Application status updated",
          data: Apps[0],
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while updating application status",
          error,
        });
      }
  }

  const CtrlApplicationsController = async(req,res)=>{
    try {
        const Apps = await ctrlModel.find({});
        res.status(200).send({
          success: true,
          message: "Controller Application data fetched successfully",
          data: Apps,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while getting Controller application data",
          error,
        });
      }
  }

  const ChangeCtrlStatusController = async(req,res)=>{
    try {
        let Apps = await ctrlModel.find({_id:req.body.appId});
        Apps[0].status=req.body.status
        let user = await userModel.find({_id:Apps[0].userId});
        user[0].type="controller";
        user[0].machine.push(Apps[0].machineId)
        console.log(user[0])
        await user[0].save();
        console.log(Apps[0]);
        await Apps[0].save()
        // var appli = new applyMachineModel({...Apps[0],status:req.body.status})
        // await appli.save()
        res.status(200).send({
          success: true,
          message: "Application status updated",
          data: Apps[0],
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while updating application status",
          error,
        });
      }
  }

  const CtrlgetAllAppsController = async (req, res) => {
    try {
        let Apps = []
        // console.log(req.body.machines)[k,h,h]
        // req.body.machines.map(async(item)=>{
        //   let x=await applyMachineModel.find({machineId:item})
        //   console.log(x[0])
        //   Apps.push(x[0])
        //   console.log(Apps,"apps")
        // })   
        console.log(req.body.machines)
        for(var item of req.body.machines){
          var x = await applyMachineModel.find({machineId:item})
          // print(item)
          // console.log(item,"item")
          Apps.push(x[0])
          // console.log(x[0],"x inside")
        }

        // console.log(Apps,"Ctrlgetallapps")
        res.status(200).send({
          success: true,
          message: "Machine Applications Data list",
          data: Apps,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while getting machine applications data",
          error,
        });
      }
  };

  const CtrlUserApplicationsController = async(req,res)=>{
    try {
        const Apps = await applyMachineModel.find({_id:req.body.appId});
        // console.log(Apps[0])
        res.status(200).send({
          success: true,
          message: "Application data fetched successfully",
          data: Apps[0],
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while getting application data",
          error,
        });
      }
  }

  const CtrlChangeStatusController = async(req,res)=>{
    try {
        let Apps = await applyMachineModel.find({_id:req.body.appId});
        Apps[0].status=req.body.status
        console.log(Apps[0]);
        await Apps[0].save()
        // var appli = new applyMachineModel({...Apps[0],status:req.body.status})
        // await appli.save()
        res.status(200).send({
          success: true,
          message: "Application status updated",
          data: Apps[0],
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while updating application status",
          error,
        });
      }
  }

  const CtrlgetAllMachinesController = async(req,res)=>{
    try {
      let Apps = []
      // console.log(req.body.machines)[k,h,h]
      // req.body.machines.map(async(item)=>{
      //   let x=await applyMachineModel.find({machineId:item})
      //   console.log(x[0])
      //   Apps.push(x[0])
      //   console.log(Apps,"apps")
      // })   
      // console.log(req.body.machines)
      for(var item of req.body.mach){
        var x = await machineModel.find({_id:item})
        // print(item)
        // console.log(item,"item")
        Apps.push(x[0])
        // console.log(x[0],"x inside")
      }

      // console.log(Apps,"Ctrlgetallapps")
      res.status(200).send({
        success: true,
        message: "Machine Applications Data list",
        data: Apps,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while getting machine applications data",
        error,
      });
    }
  }

  const getAllData = async(req,res) => {
    try {
      const machine = await machineModel.find({_id:req.body.machId})
      
      // console.log(Apps,"Ctrlgetallapps")
      res.status(200).send({
        success: true,
        message: "Machine Data Fetched Successfully",
        data: machine[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while getting machine data",
        error,
      });
    }
  }

  const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "users data list",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "erorr while fetching users",
        error,
      });
    }
  };

  const deleteUserController = async(req,res)=>{
    try {
      const users = await userModel.findOneAndDelete({_id:req.body.id});
      res.status(200).send({
        success: true,
        message: "user deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "erorr while deleting user",
        error,
      });
    }
  }

  const checkPasswordController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.body.email });
      console.log(user);
      if (!user) {
        return res
        .status(200)
        .send({ message: "User not found", success: false });
      }
      
      const isMatch = await bcrypt.compare(req.body.body.password, user.password);
      if (!isMatch) {
        return res
        .status(200)
        .send({ message: "Invalid password", success: false });
      }
      
      res.status(200).send({
        message: "Correct Password",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `Error in check Password controller ${error.message}`,
      });
    }
  };
  
const changePasswordController = async (req, res) => {
  try {
    console.log(req.body.body);
    const user = await userModel.findOne({ email: req.body.body.email });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.body.newpassword, salt);
    user.password = hashedPassword;
    await user.save();
    
    // Generate a new token with the updated user information
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
      );
      
      res.status(201).send({
        message: "Password changed successfully",
        success: true,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Change Password Controller ${error.message}`,
      });
    }
};

// module.exports = {
//   loginController,
//   registerController,
//   authController,
//   checkPasswordController,
//   changePasswordController,
// };

module.exports = {loginController,registerController,authController,userAppointmentsController,getAllAppsController,ApplicationsController,ChangeStatusController,CtrlApplicationsController,ChangeCtrlStatusController,CtrlgetAllAppsController,CtrlChangeStatusController,CtrlUserApplicationsController,CtrlgetAllMachinesController,getAllData,getAllUsersController,deleteUserController,checkPasswordController,
  changePasswordController};