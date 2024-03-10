const Message = require("../modals/messageModal")
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")



const sendMessage = asyncHandler(async (req, res) => {
    try {
        const { senderId, recipientId, content } = req.body;
        if (!senderId || !recipientId) {
            return res.status(400).json({ error: 'Both senderId and recipientId are required' });
        }
        if (!content || content == "") {
            return res.status(400).json({ error: 'content is required' });
        }

        const message = new Message({
            senderId: senderId,
            recipientId: recipientId,
            content,
        });

        await message.save();

        res.status(201).json({ message: 'Message saved successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(error.statusCode || 500).json({ error: error.message });


    }

})
const conversation = asyncHandler(async (req, res) => {
    try {
        const { senderId, recipientId } = req.body;

        if (!senderId || !recipientId) {
            return res.status(400).json({ error: 'Both senderId and recipientId are required' });
        }
        // Find messages between senderId and recipientId
        const messages = await Message.find({
            $or: [
                { senderId: senderId, recipientId: recipientId },
                { senderId: recipientId, recipientId: senderId }
            ]
        }).sort({ createdAt: 'asc' });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(error.statusCode || 500).json({ error: error.message });


    }

})
module.exports = { sendMessage, conversation }