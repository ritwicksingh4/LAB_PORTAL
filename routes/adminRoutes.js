const express = require("express");
const { getAllAppsController, ApplicationsController, ChangeStatusController, ChangeCtrlStatusController, CtrlApplicationsController, getAllUsersController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
// router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || APPLICATIONS
router.get("/getAllApps", authMiddleware, getAllAppsController);

//GET METHOD || GET APPLICATION
router.post("/application", authMiddleware , ApplicationsController);

//POST METHOD || CHANGE STATUS
router.post("/changestatus", ChangeStatusController);

router.get("/getAllCtrlApps", authMiddleware , CtrlApplicationsController);

//POST METHOD || CHANGE STATUS
router.post("/changectrlstatus", ChangeCtrlStatusController);

//GET METHOD || GET ALL USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//POST METHOD || Delete User
router.post("/deleteUser", authMiddleware ,deleteUserController);

//POST ACCOUNT STATUS
// router.post(
//   "/changeAccountStatus",
//   authMiddleware,
//   changeAccountStatusController
// );

module.exports = router;
