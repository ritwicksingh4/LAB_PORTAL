const express = require('express');
const { addMachineController, getAllMachinesController, applyforController, getSampleDetails } = require('../controllers/machineController');
const { loginController, registerController, authController } = require('../controllers/userController');
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

//GET
router.post('/getsampledetails',getSampleDetails)

module.exports = router;