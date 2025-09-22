
import { HashRouter as Router, Routes, Navigate, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/dashboard/Home"
import Income from "./pages/dashboard/Income"
import Expense from "./pages/dashboard/Expense"
import UserProvider from "./context/userContext"
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path={"/"} element={<Root />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/dashboard"} element={<Home />} />
            <Route path={"/income"} element={<Income />} />
            <Route path={"/expense"} element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px"
          }
        }}

      />
    </UserProvider>

  )
}

export default App


const Root = () => {
  // check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token")

  return isAuthenticated ? (<Navigate to={'/dashboard'} />) : (<Navigate to={'/login'} />)
}