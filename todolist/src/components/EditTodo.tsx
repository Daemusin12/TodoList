import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormState {
    toDo: string;
    dueDate: string;
    status: string;
}

interface EditTodoProps {
    data: any;
    isEditTodo: boolean;
    closeEditTodo: () => void;
  }

const EditTodo: React.FC<EditTodoProps> = ({ data, isEditTodo, closeEditTodo }) => {

    const [todoFormData, setTodoFormData] = useState<FormState>({
        toDo:  '', 
        dueDate: '',
        status: '',
    });

    useEffect(() => {
        setTodoFormData({
          toDo: data.toDo || '',
          dueDate: data.dueDate || '',
          status: data.status || '',
        });
      }, [data]);

    const handleTodoInputChange = (e: any) => {
        const { name, value } = e.target;
        setTodoFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
            return updatedData;
        });
    };

    const submitTodo = async () => {
        try {

            const currentDate = new Date();
            const dueDate = new Date(todoFormData.dueDate);

            if (todoFormData.toDo === '' || todoFormData.dueDate === '') {

                toast.error('Please No Empty Fields');

                closeEditTodo();

            } else if (dueDate < currentDate) {

                toast.error('Due date must be in the future');

                closeEditTodo();

            } else {
                const existingTodos = localStorage.getItem('todos');
                const todos = existingTodos ? JSON.parse(existingTodos) : [];
        
                const newTodo = {
                  id: data.id,
                  ...todoFormData,
                };
        
                const updatedTodos = todos.map((todo) =>
                  todo.id === data.id ? newTodo : todo
                );
        
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
        
                closeEditTodo();
        
                toast.success('Todo Edited successfully');
            }
            
        } catch (err) {

            console.log(err)

        }
    };

  return (
    <div>
        {isEditTodo && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-md shadow-md overflow-hidden'>
            <div className=' flex flex-col text-lg font-semibold mb-2 w-[550px] h-[400px]'>
              <div className='flex h-[70px] p-4 items-center justify-center text-white text-[25px]'>
                <p className='flex grow ml-12 text-black items-center justify-center'>EDIT TASK</p>
                <button className='h-[35px] w-[35px] bg-black  flex items-center justify-center rounded-full' onClick={closeEditTodo}>
                    X
                </button>
              </div>
              <div className='flex grow items-center justify-center font-Eurostile'>
                <form className='w-[400px]'>
                    <div className='flex flex-col mb-3 gap-2'>
                        <label className='block text-xl font-large text-gray-700'>
                            To Do
                        </label>
                            <input
                            name='toDo'
                            value={todoFormData.toDo}
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
                            value={todoFormData.dueDate}
                            onChange={handleTodoInputChange}
                            className='p-2 rounded-lg h-[35px]  bg-SBL-lightgrey w-full text-gray-700 text-[15px]'
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-3 gap-2'>
                    <label className='block text-xl font-large text-gray-700'>
                        Status
                    </label>
                    <select
                        name='status'
                        value={todoFormData.status}
                        onChange={handleTodoInputChange}
                        className='pl-2 h-[26px] w-[124px] rounded-lg text-[14px]'
                    >
                        <option value={'incomplete'}>incomplete</option>
                        <option value={'complete'}>complete</option>
                    </select>
                </div>
                        <div className='flex items-center justify-center h-[60px]'>
                            <button  type='button' className='bg-[#ED6F00] h-[40px] w-[120px] font-bold rounded-md' onClick={submitTodo}>EDIT TO DO</button>
                        </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditTodo