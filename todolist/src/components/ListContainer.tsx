import React, { useState } from 'react';
import { useTabState } from './TabContext'
import TableContainer from './TableContainer';
import List from './List';

interface ListContainerProps {
    setTodos: (todo: any) => void;
  }

const ListContainer: React.FC<ListContainerProps> = ({setTodos}) => {

    const formatDate = (dateString) => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
          return new Date(dateString).toLocaleDateString(undefined, options);
      };

    const { TabState } = useTabState();

    const [page, setPage] = useState(1);

 

    const existingTodos = localStorage.getItem('todos');
    const allTodo = existingTodos ? JSON.parse(existingTodos) : [];
    const sortedTodos = allTodo.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(todo => ({
        ...todo,
        dueDate: formatDate(todo.dueDate),
      }));
    const incompleteTodo = sortedTodos.filter(todo => todo.status === "incomplete");
    const completeTodo = sortedTodos.filter(todo => todo.status === "complete");

    const handleCurrentPage = (number: number) => {
        setPage(number)
    };

    const deleteTodo = (todoIdToDelete) => {
        const existingTodos = localStorage.getItem('todos');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
      
        const updatedTodos = todos.filter(todo => todo.id !== todoIdToDelete);
      
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        
        setTodos(updatedTodos);
      };

      const doneTodo = (todoIdToComplete) => {
        const existingTodos = localStorage.getItem('todos');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
      
        const todoToComplete = todos.find(todo => todo.id === todoIdToComplete);
      
        if (todoToComplete) {
          todoToComplete.status = 'complete';
        }
      
        localStorage.setItem('todos', JSON.stringify(todos));
      
        setTodos([...todos]);
      };


let data;

if (TabState === 1) {

    data = sortedTodos

} else if (TabState === 2) {

    data = completeTodo

} else if (TabState === 3) {

    data = incompleteTodo

}

return (
    <div className='flex flex-col bg-white mt-[20px] w-[950px] h-[350px]'>
        <TableContainer datas={data} paginate={handleCurrentPage}
                    totalDatas={data.length} currentPage={page} datasPerPage={4}>
            <List deleteTodo={deleteTodo} doneTodo={doneTodo}/>
        </TableContainer>
    </div>
  )

}

export default ListContainer