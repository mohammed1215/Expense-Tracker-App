import React from 'react'
import Card_2 from "../../assets/images/card2.png"
import { LuTrendingUpDown } from "react-icons/lu"
const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>

      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bd-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'></div>
        <div className='w-48 h-52 rounded-[40px] border-fuchsia-600 border-[20px] absolute top-[30%] -right-10 '></div>
        <div className='w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7 -left-5'></div>


        <StatsInfoCard
          icon={<LuTrendingUpDown />}
          label='Track Your Expenses and Income'
          value='430,000'
          color='bg-primary'
        />

        <img src={Card_2} alt="" className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 ' />
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
  return <div className='absolute flex bg-white rounded-xl p-5 shadow-md shadow-purple-400/10 border border-gray-200/50 z-10 gap-6'>

    <div className={`w-12 h-12 text-[26px] ${color} rounded-full flex items-center justify-center text-white`}>
      {icon}
    </div>
    <div>
      <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
      <span className='text-[20px]'>
        ${value}
      </span>
    </div>
  </div>
}