const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/crudMongo", { useNewUrlParser: true, useUnifiedTopology: true }); // Corrected connection string

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String
});

const User = mongoose.model("User", userSchema); // Capitalize the model name conventionally

module.exports = User; // Export the model
