const userService = require("../service/user-service");

// Function to create a user
const createUser = async (req, res) => {
    try {
        let userInfo = validateUserObject(req.body); // Validate the user object
        let response = await userService.registerUser(userInfo); // Call the registerUser function from the user-service
        if (response) {
            // If the response exists, send a success response
            res.status(200).send({
                status: 200,
                message: 'User Data Sava Successfully',
                result: response
            });
        }
    } catch (error) {
        // If an error occurs, send an error response
        res.status(400).send({
            status: 400,
            error: error.message
        });
        console.error("Error Caught on createUser", error.message);
    }
};

// Function to get user information
const getUserInfo = async (req, res) => {
    try {
        let userId = req.params.userId; // Get the userId from the request parameters
        let response = await userService.getInfo(userId); // Call the getInfo function from the user-service
        if (response) {
            // If the response exists, send a success response
            res.status(200).send({
                status: 200,
                message: 'User Data Fetched Successfully',
                results: response
            });
        }
    } catch (error) {
        // If an error occurs, send an error response
        res.status(400).send({
            status: 400,
            error: error.message
        });
        console.error("Error Caught on getUserInfo", error.message);
    }
};

// Function to list users
const listUser = async (req, res) => {
	try {
		// Call the listAllUsers function from the userService to get all users
		let allUsers = await userService.getAllUsers();
		// Send success response with the list of all users
		res.status(200).send(allUsers);
	} catch (error) {
		console.log("Error occurred while listing all users: ", error);
		res.status(400).json({ message: "Error", error: error.message });
	}
};

// Function to delete a user
const deleteUser = async (req, res) => {
    try {
        let userId = req.params.userId; // Get the userId from the request parameters
        await userService.deleteUserData(userId); // Call the deleteUserData function from the user-service
        res.status(200).send({
            status: 200,
            message: "Successfully Deleted user!"
        });
    } catch (error) {
        console.error("Error Caught on deleteUser", error.message);
        res.status(400).send({
            status: 400,
            error: error.message
        });
    }
};

// Function to update user data
const updateUser = async (req, res) => {
    try {
        let userId = req.params.userId;
        let userData = req.body; // Get the user data from the request body
        let response = await userService.updateUser(userId, userData); // Call the updateUser function from the user-service
        res.status(200).send({
            status: 200,
            message: "Successfully updated user data!",
			result : response
        });
    } catch (error) {
        console.error("Error Caught on updateUser", error.message);
		res.status(400).send({
            status: 400,
            error: error.message
        });
    }
};

function validateUserObject(user) {
    // Check if all required fields are present
    if (!user.name || !user.email || !user.phone || !user.address) {
      throw new Error('All fields are required.');
    }
  
    // Check if the name is a non-empty string
    if (typeof user.name !== 'string' || user.name.trim() === '') {
      throw new Error('Invalid name. Name must be a non-empty string.');
    }
  
    // Check if the address is a non-empty string
    if (typeof user.address !== 'string' || user.address.trim() === '') {
      throw new Error('Invalid address. Address must be a non-empty string.');
    }
  
    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      throw new Error('Invalid email format.');
    }
  
    // Check if the phone number is valid
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number format
    if (!phoneRegex.test(user.phone)) {
      throw new Error('Invalid phone number format.');
    }
  
    // If all checks pass, the object is considered valid
    return user;
}

module.exports = { createUser, getUserInfo, listUser, deleteUser,updateUser };

