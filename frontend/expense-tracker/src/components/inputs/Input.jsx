import { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div >
      <label htmlFor="" className='text-[13px] text-slate-800 dark:text-white'>{label}</label>
      <div className='input-box'>
        <input className='w-full bg-transparent outline-none' type={type === 'password' ? showPassword ? "text" : "password" : type} value={value} onChange={onChange} placeholder={placeholder} />

        {type === 'password' ? showPassword ? (<FaRegEyeSlash className='text-primary cursor-pointer size-6' onClick={() => setShowPassword(false)} />) : <FaRegEye className='text-primary cursor-pointer' onClick={() => setShowPassword(true)} /> : ""}
      </div>
    </div>
  )
}

export default Input