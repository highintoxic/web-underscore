const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        userType: {
            type: String,
            required: true,
            enum: ['user', 'doctor'],
            default: 'user'
        },
        registrationNumber: {
            type: String,
            required: function() { return this.userType === 'doctor'; }
        },
        registrationYear: {
            type: Number,
            required: function() { return this.userType === 'doctor'; }
        },
        councilName: {
            type: String,
            required: function() { return this.userType === 'doctor'; }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
