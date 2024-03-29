const express = require("express")
// const { getContacts, createContact, deleteContact, updateContact, getContact } = require("../controllers/contactControllers")
const { register, login, currentUser , userList } = require("../controllers/userController")

const validateToken = require("../middleWare/validateToken")
const router = express.Router()

router.route("/sign-up").post(register)
router.route("/list").get(validateToken,userList)    
router.route("/login").post(login)
router.route("/current").post(validateToken ,currentUser)

module.exports = router