const { getDashboardData } = require("../controllers/dashboard.controller")
const { protect } = require("../Middlewares/authMiddleware")


const dashboardRouter = require('express').Router()

dashboardRouter.get("/", protect, getDashboardData);

module.exports = { dashboardRouter }