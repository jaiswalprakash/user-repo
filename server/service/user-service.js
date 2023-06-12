const userModel = require("../model/user-model");

// Function to register a new user
const registerUser = (payload) => {
	// Create a new user document using the userModel and save it to the database
	return new userModel({
		...payload
	}).save();
};

// Function to get all users
const getAllUsers = () => {
	// Find all user documents in the userModel collection
	return userModel.find({});
};

// Function to get user information by ID
const getInfo = (_id) => {
	// Find a user document with the specified _id in the userModel collection
	return userModel.findById({ _id });
};

// Function to delete user data
const deleteUserData = (user) => {
	// Find a user document with the specified _id and delete it from the userModel collection
	return userModel.findByIdAndDelete({ _id: user });
};

// Function to update user data
const updateUser = (_id, userData) => {
    return userModel.findByIdAndUpdate({ _id }, {$set: {
        ...userData
    }}, {new: true}); // Update the user with the specified _id using the new user data
};

module.exports = { registerUser, getInfo, getAllUsers, deleteUserData, updateUser }; // Export the service functions
