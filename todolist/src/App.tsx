import React from 'react'
import UserProfile from './components/UserProfile'
import { TabProvider } from './components/TabContext'

const App: React.FC = () => {
  return (
    <TabProvider>
      <div className='flex flex-col items-center h-screen bg-neutral-300'>
        <UserProfile/>
      </div>
    </TabProvider>
  )
}

export default App