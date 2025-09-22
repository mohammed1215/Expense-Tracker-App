/**
 * 
 * @param {string} email 
 */

import moment from "moment";

export function validateEmail(email) {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email)
}

export const getInitials = (name) => {
  if (!name) return ""
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {

    initials += words[i][0]

  }
}


/**
 * 
 * @param {number} num 
 * @returns 
 */
export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split('.')
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger
}

export const prepareExpenseBarChartData = (data = []) => {

  const chartData = data.map(item => ({
    category: item?.source,
    amount: item?.amount,
    month: moment(item?.date).format('Do MMM'),
  }))
  console.log("from function expense preparation", { chartData })

  return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }))

  console.log("from function income preparation", { chartData })

  return chartData
}