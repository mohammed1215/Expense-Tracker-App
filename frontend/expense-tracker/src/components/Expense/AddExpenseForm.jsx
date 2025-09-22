import { useState } from "react"
import Input from "../inputs/Input"
import EmojiPickerPopup from "../EmojiPickerPopup"

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    source: "",
    amount: "",
    date: "",
    icon: ""
  })

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value })
  return (
    <div >

      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.source}
        onChange={({ target }) => handleChange("source", target.value)}
        placeholder="Freelance, Salary, etc"
        label="Expense Source"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm