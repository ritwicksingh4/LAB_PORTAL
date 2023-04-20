const express = require("express");
const { CtrlgetAllAppsController, CtrlUserApplicationsController, CtrlChangeStatusController, CtrlgetAllMachinesController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//POST METHOD || APPLICATIONS
router.post("/getAllApps", authMiddleware, CtrlgetAllAppsController);

//POST METHOD || GET APPLICATION
router.post("/application", authMiddleware , CtrlUserApplicationsController);

//POST METHOD || CHANGE STATUS
router.post("/changestatus", CtrlChangeStatusController);

//POST METHOD || APPLICATIONS
router.post("/CtrlgetAllMachines", authMiddleware, CtrlgetAllMachinesController);

module.exports = router;
