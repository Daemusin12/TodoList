import React from 'react'
import UserProfile from './components/UserProfile'
import { TabProvider } from './components/TabContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <TabProvider>
        <div className='flex flex-col items-center h-screen bg-neutral-300'>
          <UserProfile/>
        </div>
      </TabProvider>
    </>
  )
}

export default App