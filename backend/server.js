require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { authRouter } = require('./routes/auth.route')
const { incomeRouter } = require('./routes/Income.route')
const { expenseRouter } = require('./routes/Expense.route')
const { dashboardRouter } = require('./routes/dashboard.route')
//database connected
require('./config/db')

const app = express()

//variables
const port = process.env.PORT || 3000

console.log(process.env.CLIENT_URL)

//middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ["GET", 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/income', incomeRouter)
app.use('/api/v1/expense', expenseRouter)
app.use('/api/v1/dashboard', dashboardRouter)
//serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, "uploads")))

// error handler middleware

app.listen(port, (err) => {
  if (err) {
    return console.log("there is error")
  }
  console.log('server is running on port', port)
})