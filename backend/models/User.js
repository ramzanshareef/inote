const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "General"
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    notes: [NotesSchema]
})

module.exports = mongoose.model("user", UserSchema);