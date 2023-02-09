const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
        default: ""
    },
    imgTitle: {
        type: String,
        default: ""
    },
    imgSmall: {
        type: String,
        default: ""
    },
    trailer: {
        type: String,
    },
    video: {
        type: String
    },
    year: {
        type: String
    },
    limit: {
        type: Number
    },
    genre: {
        type: String
    },
    duration: {
        type: Number
    },
    isSeries: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model("Movie", MovieSchema);