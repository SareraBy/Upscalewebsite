const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const UserSchema = new Schema({
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    activationLink: {type: String, required: true},
})

module.exports = model("User", UserSchema);