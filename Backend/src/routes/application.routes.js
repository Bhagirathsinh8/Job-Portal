const express = require("express");
const router = express.Router();
const Controller = require("../module/application/application.controller");
const { verifyToken, roleMiddleware } = require("../middleware/auth.middleware");

// Get All Applications
router.get("/", Controller.getAllApplications);

// Get Application By ID
router.get("/:id", Controller.getApplicationById);

// Add Application
router.post("/post",verifyToken,roleMiddleware(['student']), Controller.createApplication);

// Update Application
router.put("/update/:id", Controller.updateApplication);

// Delete Application
router.delete("/delete/:id", Controller.deleteApplication);

//Update Status
router.patch("/:id/status",verifyToken,roleMiddleware(['recuiter']), Controller.updateApplicationStatus);

module.exports = router;
