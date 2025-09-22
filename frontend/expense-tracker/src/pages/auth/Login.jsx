import { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import Input from "../../components/inputs/Input"
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  /**
   * 
   * @param {SubmitEvent} e 
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please Enter valid email')
      return;
    }

    if (!password) {
      setError('Please Enter The Password')
      return;
    }

    setError('')

    // login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user)
        navigate('/dashboard');
      }


    } catch (error) {
      console.log(error)
      if (error.response && error.reponse.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <AuthLayout>
      <div className='mt-auto h-full'>
        <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter Your Details to log in</p>
          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type='email'
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type='password'
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button type="submit" className="btn-primary" >Login</button>

            <div className={'mt-4 flex justify-center'}>

            </div>
            <p className={'text-[13px] text-slate-800 mt-3'}>Don't have an account? <Link className={'font-medium text-primary underline'} to={'/signup'}>Sign Up</Link></p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
export default Login