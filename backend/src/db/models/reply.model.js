const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 1000,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Reply", ReplySchema);