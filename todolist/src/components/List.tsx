import React, { useContext } from 'react';
import { TableContext } from './TableContainer';

interface ListProps {
    deleteTodo: (id) => void;
    doneTodo: (id) => void;
    editTodo: (data) => void;
  }

const List: React.FC<ListProps> = ({deleteTodo, doneTodo, editTodo}) => {

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

    const { datas, loading } = useContext(TableContext) ?? { datas: [], loading: false };

    const handleDelete = (todoIdToDelete) => {
        deleteTodo(todoIdToDelete);
      };

    const handleDone = (todoIdToDelete) => {
        doneTodo(todoIdToDelete);
    };

    const handleEdit = (todoToEdit) => {
      editTodo(todoToEdit);
  };

    if (loading) {
        return <h2>Loading</h2>;
      }
    
      return (
        <div className='flex flex-col h-[250px]'>
          <table className="table-fixed text-center w-full">
            <thead className= 'text-black h-10 text-[22px] font-EurostileBeckerHeavyRegular'>
              <tr>
                <th className='w-[150px]'>TASK</th>
                <th className='w-[150px]'>DUE DATE</th>
                <th className='w-[100px]'>STATUS</th>
                <th className='w-36'>ACTION</th>
              </tr>
            </thead>
            <tbody className=' border-black text-[20px]'>
              {datas.map((data, index) => (
                <tr key={index} className='border-black border-[1px]'>
                  <td className='h-[50px]'>{data.toDo}</td>
                  <td >{formatDate(data.dueDate)}</td>
                  <td >{data.status}</td>
                  <td className='flex flex-row justify-around items-center'>
                    {data.status === 'incomplete' && <button onClick={() => handleDone(data.id)}>DONE</button>}
                    <button onClick={() => handleDelete(data.id)}>DELETE</button>
                    <button onClick={() => handleEdit(data)}>EDIT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
export default List;