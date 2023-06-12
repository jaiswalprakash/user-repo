const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

// Define routes and their corresponding controller functions

// Route to create a user
router.post("/create", userController.createUser);

// Route to get user information by user ID
router.get("/get-info/:userId", userController.getUserInfo);

// Route to list all users
router.get("/get-all", userController.listUser);

// Route to delete a user by user ID
router.delete("/delete/:userId", userController.deleteUser);

// Route to update a user
router.put("/update/:userId", userController.updateUser);

module.exports = router; // Export the router object for use in other modules
