import React, { useState } from 'react';

interface TabComponentProps {
    openAddTodo: () => void;
  }


const TabComponent: React.FC<TabComponentProps> = ({ openAddTodo }) => {

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber: number) => {
      setActiveTab(tabNumber);
    };

  return (
    <div className='flex flex-row grow justify-between'>
        <div className='flex m-2 gap-6'>
            <button
            className={`w-[100px] rounded-sm ${activeTab === 1 ? 'bg-[#ED6F00]' : ''}`}
            onClick={() => handleTabClick(1)}
            >
                ALL 
            </button>
            <button
            className={`w-[150px] rounded-sm ${activeTab === 2 ? 'bg-[#ED6F00]' : ''}`}
            onClick={() => handleTabClick(2)}
            >
                COMPLETE
            </button>
            <button
            className={`w-[150px] rounded-sm ${activeTab === 3 ? 'bg-[#ED6F00]' : ''}`}
            onClick={() => handleTabClick(3)}
            >
                INCOMPLETE
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