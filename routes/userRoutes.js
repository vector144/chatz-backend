const express = require("express")
// const { getContacts, createContact, deleteContact, updateContact, getContact } = require("../controllers/contactControllers")
const { register, login, currentUser } = require("../controllers/userController")

const validateToken = require("../middleWare/validateToken")
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/current").post(validateToken ,currentUser)

// router.route("/register").post(deleteContact)
module.exports = router