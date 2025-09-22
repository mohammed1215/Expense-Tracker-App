const xlsx = require("xlsx");
const { Income } = require("../models/Income.model");

//add income source
exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.id

    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newIncome = new Income({
      userId,
      amount,
      date: new Date(date),
      icon,
      source,
    })

    await newIncome.save()
    res.status(200).json({ newIncome })

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

//get all income sources
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id
  try {
    const incomes = await Income.find({ userId }).sort({ date: "desc" })
    return res.json({ incomes });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server Error" })
  }
}
//delete income source
exports.deleteIncome = async (req, res) => {
  try {
    const incomes = await Income.findByIdAndDelete(req.params.id)
    return res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server Error" })
  }
}
//download income source excel sheet

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: "desc" })

    const data = income.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Income');
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download("income_details.xlsx");
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server Error" })
  }
}