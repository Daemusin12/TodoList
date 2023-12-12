import React from 'react'

interface TodoFormProps {
    handleTodoInputChange: (data: any) => void;
    formData: any;
    buttonComponent: React.ReactNode;
  }

const TodoForm: React.FC<TodoFormProps> = ({ handleTodoInputChange, formData, buttonComponent }) => {
  return (
    <div>
        <form className='w-[400px]'>
            <div className='flex flex-col mb-3 gap-2'>
                <label className='block text-xl font-large text-gray-700'>
                    To Do
                </label>
                    <input
                      name='toDo'
                      value={formData.toDo}
                      onChange={handleTodoInputChange}
                      className='p-2 rounded-lg h-[35px]  bg-SBL-lightgrey w-full text-gray-700 text-[15px]'
                      placeholder='Type here...'
                      required
                    />
            </div>
            <div className='flex flex-col mb-3 gap-2'>
                <label className='block text-xl font-large text-gray-700'>
                    Due Date
                </label>
                <input
                    type='datetime-local'
                    name='dueDate'
                    value={formData.dueDate}
                    onChange={handleTodoInputChange}
                    className='p-2 rounded-lg h-[35px]  bg-SBL-lightgrey w-full text-gray-700 text-[15px]'
                    required
                />
                </div>
                <div className='flex items-center justify-center h-[60px]'>
                    {buttonComponent}
                </div>
        </form>
    </div>
  )
}

export default TodoForm