const express = require('express');
const { addMachineController, getAllMachinesController, applyforController, getSampleDetails, applyForMachine, getbillamount, applyForSD, editMachineController } = require('../controllers/machineController');
const { loginController, registerController, authController, userAppointmentsController, getAllAppsController, ApplicationsController, getAllData } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login",loginController);

//REGISTER || POST
router.post("/register",registerController);

//Auth || POST
router.post('/getUserData',authMiddleware,authController);

//POST
router.post('/addmachine',addMachineController)

//POST
router.post('/getAllMachines',getAllMachinesController)

//POST
router.post('/applyforcontroller',applyforController)

//POST
router.post('/getsampledetails',getSampleDetails)

//POST
router.post('/applyforsd',applyForSD)

//POST
router.post('/applyformachine',applyForMachine)

//POST
router.post('/getbillamount',getbillamount)

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

//Get all doctors
router.get("/getAllApps", authMiddleware, getAllAppsController);

//POST getalldata
router.post('/getAllData',getAllData)

//POST editmachine
//POST
router.post('/editmachine',editMachineController)

module.exports = router;