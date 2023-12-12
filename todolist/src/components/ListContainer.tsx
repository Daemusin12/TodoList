import React, { useState } from 'react';
import { useTabState } from './TabContext'
import TableContainer from './TableContainer';
import List from './List';

interface ListContainerProps {
    setTodos: (todo: any) => void;
    editTodo: (data: any) => void;
  }

  type Todo = {
    id: number;
    dueDate: string;
    status: "incomplete" | "complete";
  };

const ListContainer: React.FC<ListContainerProps> = ({setTodos ,editTodo}) => {


    const { TabState } = useTabState();

    const [page, setPage] = useState(1);

    const existingTodos = localStorage.getItem('todos');
    const allTodo = existingTodos ? JSON.parse(existingTodos) : [];
    const sortedTodos = allTodo.sort((a: Todo, b: Todo) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const incompleteTodo = sortedTodos.filter((todo: Todo) => todo.status === "incomplete");
    const completeTodo = sortedTodos.filter((todo: Todo) => todo.status === "complete");

    const handleCurrentPage = (number: number) => {
        setPage(number)
    };

    const deleteTodo = (todoIdToDelete: any) => {
        const existingTodos = localStorage.getItem('todos');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
      
        const updatedTodos = todos.filter((todo: Todo) => todo.id !== todoIdToDelete);
      
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        
        setTodos(updatedTodos);
      };

      const doneTodo = (todoIdToComplete: any) => {
        const existingTodos = localStorage.getItem('todos');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
      
        const todoToComplete = todos.find((todo: Todo) => todo.id === todoIdToComplete);
      
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
            <List deleteTodo={deleteTodo} doneTodo={doneTodo} editTodo={editTodo}/>
        </TableContainer>
    </div>
  )
}

export default ListContainer