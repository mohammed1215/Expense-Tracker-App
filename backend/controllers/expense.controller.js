const xlsx = require("xlsx");
const { Expense } = require("../models/Expense.model");

//add expense source
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id

    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newExpense = new Expense({
      userId,
      amount,
      date: new Date(date),
      icon,
      source,
    })

    await newExpense.save()
    res.status(200).json({ newExpense })

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

//get all expense sources
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id
  try {
    const expenses = await Expense.find({ userId }).sort({ date: "desc" })
    return res.json({ expenses });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server Error" })
  }
}
//delete expense source
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id)
    return res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server Error" })
  }
}
//download expense source excel sheet

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: "desc" })

    const data = expense.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Expense');
    xlsx.writeFile(wb, 'expense_details.xlsx');
    res.download("expense_details.xlsx");
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server Error" })
  }
}