const { postSignUp, postLogin, getUserInfo } = require('../controllers/auth.controller')
const { protect } = require('../Middlewares/authMiddleware')
const { upload } = require('../Middlewares/uploadMiddleware')
const authRouter = require('express').Router()

authRouter.post('/register', postSignUp)
authRouter.post('/login', postLogin)
authRouter.get('/getUser', protect, getUserInfo)

authRouter.post("/upload-image", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

  return res.status(200).json({ imageUrl })
})

module.exports = { authRouter }