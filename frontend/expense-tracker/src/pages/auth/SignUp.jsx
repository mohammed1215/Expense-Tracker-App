
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import Input from "../../components/inputs/Input"
import { validateEmail } from '../../utils/helper'
import { useContext, useState } from 'react'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'
import axiosInstance from '../../utils/axiosInstance'


const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  //handle sign up form
  /**
   * 
   * @param {SubmitEvent} e 
   */
  async function handleSignUp(e) {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError("Please Enter a name")
      return
    }

    if (!validateEmail(email)) {
      setError('Please Enter valid email')
      return;
    }

    if (!password) {
      setError('Please Enter The Password')
      return;
    }

    setError('')

    // signup api call
    try {
      //upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        console.log(imgUploadRes.imageUrl)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      console.log(profileImageUrl)

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
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
          <h3 className='text-xl font-semibold text-black'>Create an Account
          </h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>
          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


            <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
              <div>
                <Input
                  value={fullName}
                  onChange={({ target }) => setFullName(target.value)}
                  label="Full Name"
                  placeholder="John "
                  type='text'
                />
              </div>
              <div>

                <Input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  label="Email Address"
                  placeholder="john@example.com"
                  type='email'
                />
              </div>

              <div className='col-span-2'>
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Min 8 Characters"
                  type='password'
                />
              </div>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button type="submit" className="btn-primary" >SignUp</button>

            <div className={'mt-4 flex justify-center'}>

            </div>
            <p className={'text-[13px] text-slate-800 mt-3'}>Already have an account? <Link className={'font-medium text-primary underline'} to={'/login'}>Login</Link></p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp