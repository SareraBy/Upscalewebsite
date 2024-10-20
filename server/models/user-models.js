const {Schema, model, models} = require('mongoose');
const mongoose = require("mongoose");

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = models.User || model("User", UserSchema);
