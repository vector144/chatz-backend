const express = require("express")
// const { getContacts, createContact, deleteContact, updateContact, getContact } = require("../controllers/contactControllers")
const { sendMessage , conversation } = require("../controllers/messageController")

const validateToken = require("../middleWare/validateToken")
const router = express.Router()

router.route("/send").post(validateToken,sendMessage)
router.route("/messages").post(validateToken,conversation)

module.exports = router