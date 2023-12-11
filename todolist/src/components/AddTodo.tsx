import React, { useState } from 'react';
import TodoForm from './TodoForm';

interface FormState {
    toDo: string;
    dueDate: string;
}

interface AddTodoProps {
    isAddTodo: boolean;
    closeAddTodo: () => void;
  }

const AddTodo: React.FC<AddTodoProps> = ({ isAddTodo, closeAddTodo }) => {

    const [todoFormData, setTodoFormData] = useState<FormState>({
        toDo: '',
        dueDate: '',
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
        console.log(todoFormData)
    };

    const submitTodo = async () => {
        try {

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
            });

            closeAddTodo();

            console.log('Todo submitted successfully:', newTodo);
            
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
              <div className='flex h-[70px] p-4 bg-SBL-orange items-center justify-center text-white text-[25px] font-EurostileBeckerHeavyRegular'>
                <p className='flex grow ml-12 text-white items-center justify-center'>CREATE USER</p>
                <button className='h-[35px] w-[35px] bg-black  flex items-center justify-center rounded-full' onClick={closeAddTodo}>
                    X
                </button>
              </div>
              <div className='flex grow items-center justify-center font-Eurostile'>
                <TodoForm handleTodoInputChange={handleTodoInputChange} formData={todoFormData} buttonComponent={<button onClick={submitTodo}>Submit</button>}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTodo