import React from 'react'
import sclogo from '../assets/SCLogo.webp'

const UserProfile: React.FC = () => {
  return (
    <div className='flex flex-col bg-white m-[30px] w-[700px] h-[300px]'>
      <div className='flex h-[150px] bg-black items-center justify-center border-gray-400 border-b-4'>
        <div className='text-[30px] font-bold text-[#ED6F00]'>
          TO DO LIST
        </div>
      </div>
      <div className='relative flex flex-row h-[50px]'>
        <div className='absolute top-[-53px] left-[20px] flex items-center justify-center w-[100px] h-[100px] bg-white rounded-full'>
          <img src={sclogo} className='w-[70px] h-[70px]'/>
        </div>
        <div className='absolute left-[140px] top-[10px] font-semibold'>Southern Convergence Technologies Corporation</div>
      </div>
    </div>
  )
}

export default UserProfile