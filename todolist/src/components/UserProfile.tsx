import React, { useState } from 'react';
import sclogo from '../assets/SCLogo.webp'
import TabComponent from './TabComponent'
import AddTodo from './AddTodo';
import ListContainer from './ListContainer';

const UserProfile: React.FC = () => {

  const [isAddTodo, setIsAddTodo] = useState(false);
  const [todos, setTodos] = useState([]);

  const openAddTodo = () => {
    setIsAddTodo(true);
  };

  const closeAddTodo = () => {
    setIsAddTodo(false);
  };

  return (
    <>
    <div className='flex flex-col bg-white mt-[30px] w-[950px] h-[300px]'>
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
      <div className='flex grow items-center'>
      <TabComponent openAddTodo={openAddTodo}/>
      <AddTodo isAddTodo={isAddTodo} closeAddTodo={closeAddTodo}/>
      </div>
    </div>
    <ListContainer setTodos={setTodos}/>
    </>
  )
}

export default UserProfile