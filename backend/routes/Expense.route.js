const { protect } = require('../Middlewares/authMiddleware')

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} = require("../controllers/expense.controller")

const expenseRouter = require('express').Router()

expenseRouter.post('/add', protect, addExpense)
expenseRouter.get('/get', protect, getAllExpense)
expenseRouter.get('/download-excel', protect, downloadExpenseExcel)
expenseRouter.delete('/:id', protect, deleteExpense)

module.exports = { expenseRouter }