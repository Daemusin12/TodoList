import React from 'react';
import { useTabState } from './TabContext';

interface TabComponentProps {
    openAddTodo: () => void;
  }


const TabComponent: React.FC<TabComponentProps> = ({ openAddTodo }) => {

    const { TabState, setTabState } = useTabState();

    const existingTodos = localStorage.getItem('todos');
    const todos = existingTodos ? JSON.parse(existingTodos) : [];

    const allTodo = todos.length;
    const incompleteCount = todos.filter(todo => todo.status === "incomplete").length;
    const completeCount = todos.filter(todo => todo.status === "complete").length;


    console.log(todos)

    const handleTabClick = (tabNumber: number) => {
        setTabState(tabNumber);
    };

  return (
    <div className='flex flex-row grow justify-between'>
        <div className='flex m-2 gap-6'>
            <button
            className={`flex flex-row  items-center justify-center gap-2 w-[100px] rounded-sm ${TabState === 1 ? 'bg-[#ED6F00]' : ''}`}
            onClick={() => handleTabClick(1)}
            >
                <p className='text-[20px]'> {allTodo} </p> ALL 
            </button>
            <button
            className={`flex flex-row  items-center justify-center gap-2 w-[150px] rounded-sm ${TabState === 2 ? 'bg-[#ED6F00]' : ''}`}
            onClick={() => handleTabClick(2)}
            >
                <p className='text-[20px]'> {completeCount} </p> COMPLETED 
            </button>
            <button
            className={`flex flex-row  items-center justify-center gap-2 w-[150px] rounded-sm ${TabState === 3 ? 'bg-[#ED6F00]' : ''}`}
            onClick={() => handleTabClick(3)}
            >
                <p className='text-[20px]'> {incompleteCount} </p> INCOMPLETE
            </button>
        </div>
        <div className='flex w-[150px] justify-center items-center'>
            <button className='w-[120px] h-[40px] bg-slate-700 text-[#e49753] font-bold rounded-md'
            onClick={openAddTodo}>
                + ADD TO DO
            </button>
        </div>
    </div>
  )
}

export default TabComponent