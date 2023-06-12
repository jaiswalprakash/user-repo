const express = require("express");
const app = express();
// const path = require("path"); // Importing the path module for serving static files
const mongoose = require("mongoose"); // Importing the mongoose library for MongoDB connection

// Importing the user routes from './routes/users-routes'
const userRoutes = require("./routes/users-routes");

// Enable parsing of JSON request bodies
app.use(express.json());

// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Mount the routes defined in users-routes.js at the '/user' URL path
app.use("/user", userRoutes);

// Enable parsing of JSON request bodies using body-parser
app.use(require("body-parser").json());

// Connecting to the 'usersDB' MongoDB database on the local machine
mongoose
	.connect("mongodb://localhost:27017/usersDB")
	.then(() => console.log("Connected to MongoDB!"))
	.catch((err) => console.log("Error while connecting to MongoDB: ", err));

// Serving static files from the 'client/build' directory
// app.use(express.static("client/build"));
app.use(express.static(require("path").join(__dirname, "client/build")));

//Setting the port here as 3001 since the default port of react is 3000
app.listen(3001, () => console.log("Server started on port 3001"));
