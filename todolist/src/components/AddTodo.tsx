import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormState {
    toDo: string;
    dueDate: string;
    status: string;
}

interface AddTodoProps {
    isAddTodo: boolean;
    closeAddTodo: () => void;
  }

const AddTodo: React.FC<AddTodoProps> = ({ isAddTodo, closeAddTodo }) => {

    const [todoFormData, setTodoFormData] = useState<FormState>({
        toDo: '',
        dueDate: '',
        status: 'incomplete'
    });

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

                closeAddTodo();

            } else if (dueDate < currentDate) {

                toast.error('Due date must be in the future');

                closeAddTodo();

            } else {

                const existingTodos = localStorage.getItem('todos');
                const todos = existingTodos ? JSON.parse(existingTodos) : [];
        
                const newTodo = {
                id: Date.now(), ...todoFormData,
                };

                const updatedTodos = [...todos, newTodo];

                localStorage.setItem('todos', JSON.stringify(updatedTodos));
        
                setTodoFormData({
                    toDo: '',
                    dueDate: '',
                    status: 'incomplete'
                });

                closeAddTodo();

                console.log('Todo submitted successfully:', newTodo);
            }
            
        } catch (err) {

            console.log(err)

        }
    };

  return (
    <div>
        {isAddTodo && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-md shadow-md overflow-hidden'>
            <div className=' flex flex-col text-lg font-semibold mb-2 w-[550px] h-[400px]'>
              <div className='flex h-[70px] p-4 items-center justify-center text-white text-[25px]'>
                <p className='flex grow ml-12 text-black items-center justify-center'>CREATE TASK</p>
                <button className='h-[35px] w-[35px] bg-black  flex items-center justify-center rounded-full' onClick={closeAddTodo}>
                    X
                </button>
              </div>
              <div className='flex grow items-center justify-center font-Eurostile'>
                <TodoForm handleTodoInputChange={handleTodoInputChange} formData={todoFormData} buttonComponent={<button  type='button' className='bg-[#ED6F00] h-[40px] w-[120px] font-bold rounded-md' onClick={submitTodo}>ADD TO DO</button>}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTodo