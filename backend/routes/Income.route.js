const { protect } = require('../Middlewares/authMiddleware')

const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require("../controllers/income.controller")

const incomeRouter = require('express').Router()


incomeRouter.post('/add', protect, addIncome)
incomeRouter.get('/get', protect, getAllIncome)
incomeRouter.get('/download-excel', protect, downloadIncomeExcel)
incomeRouter.delete('/:id', protect, deleteIncome)


module.exports = { incomeRouter }