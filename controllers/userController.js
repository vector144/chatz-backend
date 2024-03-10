const User = require("../modals/userModal")
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const userList = asyncHandler(async (req, res) => {
  try {
    let list = await User.find({})

    const userListArray = list.map(user => ({
      id: user._id,
      userName: user.userName,
      profileImage: user.profileImage,
      email: user.email,

    }));
    res.status(201).json({ data: userListArray })
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(error.statusCode || 500).json({ error: error.message });


  }

})

const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!userName || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already registered");
    }

    // Hash the password
    const hashedPassword = await bcyrpt.hash(password, 10);

    // Create the user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      profileImage: `https://robohash.org/${userName}`,
    });

    // Check if user creation was successful
    if (!user) {
      res.status(400);
      throw new Error("User not created");
    }

    // Return success response
    res.status(201).json({
      _id: user._id,
      email: user.email,
      profileImage: user.profileImage,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    // Validate required fields
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('All fields are mandatory');
    }

    // Attempt to find user
    const user = await User.findOne({ email });

    // Check user existence and password validity
    if (!user || !(await bcyrpt.compare(String(password), user.password))) {
      // throw new Error('Email or password is invalid');
      res.status(400).json({ message: "Email or password is invalid" });
    }

    // Generate and send access token
    const accessToken = jwt.sign({
      user: { userName: user.userName, email: user.email, id: user.id },
    }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '15m',
    });
    res.status(200).json({ userName: user.userName, email: user.email, id: user.id, accessToken });
  } catch (error) {
    // Handle errors appropriately
    console.error(error); // Log the error for debugging
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});
const currentUser = asyncHandler((req, res) => {
  res.status(200).json(req.user)
})
module.exports = { register, login, currentUser, userList }