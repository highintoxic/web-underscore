const mongoose = require("mongoose");

const ReplySchema = require("./reply.model");

const reply = {
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
};

const ThreadSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 100,
	},
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
	replies: {
		type: Array.of(reply),
		default: [],
	},
	replyCount: {
		type: Number,
		default: 0,
	},
	viewCount: {
		type: Number,
		default: 0,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	lastActive: {
		type: Date,
		default: Date.now,
	},
	isPinned: {
		type: Boolean,
		default: false,
	},
});
module.exports = mongoose.model("Thread", ThreadSchema);
