const express = require("express");
const { Router } = express;
const Thread = require("../db/models/thread.model");
const { authMiddleware } = require("../middleware/index");
const User = require("../db/models/user.model");
const replyModel = require("../db/models/reply.model");

const router = Router();
router.post("/create", authMiddleware,async (req, res) => {
    try {
        console.log(req.user.id)
        const { title, content } = req.body;
        const newThread = new Thread({
            title,
            author: req.user.id,
            replies: [],
            content,
        });
        await newThread.save();
        res.status(201).json(newThread);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post("/reply", authMiddleware, async (req, res) => {
    try {
        const { content, threadId } = req.body;
        const newReply = new replyModel({
            author: User.findById(req.user.id),
            content,
        });
        const thread = await Thread.findById(threadId);
        thread.replies.push(newReply);
        await thread.save();
        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/threads", async (req, res) => {
    try {
        const threads = await Thread.find();
        res.status(200).json(threads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;