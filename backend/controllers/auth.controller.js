const jwt = require("jsonwebtoken")
const { User } = require("../models/User.model")

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
//register user
exports.postSignUp = async (req, res, next) => {
  const { fullName, email, password, profileImageUrl } = req.body

  //validate
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All Fields are required" })
  }

  try {
    //check if user exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ message: "email already exists" })
    }

    //create user
    const user = await User.create({
      fullname: fullName,
      email,
      password,
      profileImageUrl
    })

    //generate token
    return res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error registering user", error: error.message })
  }
}
//login user
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    console.log({ email, password })

    const user = await User.findOne({ email })
    if (!user || ! await user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }

    return res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error logging user", error: error.message })
  }
}
exports.getUserInfo = async (req, res, next) => {
  try {

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "User Not Found" })
    }
    return res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error logging user", error: error.message })
  }
}