const { Types, isValidObjectId } = require("mongoose")
const { Expense } = require('../models/Expense.model')
const { Income } = require('../models/Income.model')

//Dashboard Data
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
exports.getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userObjectId = new Types.ObjectId(String(userId))

    const totalIncome = await Income.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } }
      }
    ])

    console.log({ totalIncome, userId: isValidObjectId(userId) })

    const totalExpense = await Expense.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, total: { $sum: "$amount" } }
      }
    ])

    // Expense.find({date:)

    console.log({ totalExpense, userId: isValidObjectId(userId) })

    //get income transactions in the last 60 days
    const last60DaysTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: "desc" })

    //get total income for last 60 days
    const incomeLast60Days = last60DaysTransactions.reduce(
      (sum, transaction) => sum + transaction.amount
      , 0)

    console.log({ incomeLast60Days })

    //get expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: "desc" })


    //get total expense for last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount
      , 0)

    console.log({ expenseLast30Days })

    //fetch last 5 transactions (income + expenses)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: "desc" }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income"
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: "desc" }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense"
        })
      )
    ].sort((a, b) => b.date - a.date)

    return res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: (totalIncome[0]?.total || 0),
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysTransactions,
      },
      recentTransactions: lastTransactions
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "server error" })
  }
}