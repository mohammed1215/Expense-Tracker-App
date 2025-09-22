import React, { useRef, useState } from 'react'
import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {

  const inputRef = useRef();
  const [previousUrl, setPreviousUrl] = useState('')

  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //upload file to backend
      setImage(file)

      //generate previous url from the file
      const previous = URL.createObjectURL(file)

      console.log(previous)
      setPreviousUrl(previous)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviousUrl(null)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        className='hidden'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
      />
      {!image ? <div className='relative rounded-full w-20 h-20 bg-[#F3E8FF] justify-center items-center flex'>
        <LuUser className='text-4xl text-primary' />
        <button
          type='button'
          className='absolute bottom-0 cursor-pointer right-0 rounded-full bg-primary w-8 h-8 text-white justify-center items-center flex'
          onClick={onChooseFile}>
          <LuUpload />
        </button>
      </div> :
        <div className='relative'>
          <img
            src={previousUrl}
            alt="profile pic"
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 cursor-pointer flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}>
            <LuTrash />
          </button>

        </div>
      }
    </div>
  )
}

export default ProfilePhotoSelector