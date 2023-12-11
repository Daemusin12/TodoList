import React, { useContext } from 'react';
import { TableContext } from './TableContainer';
import { useTabState } from './TabContext';

interface ListProps {
    deleteTodo: (id) => void;
    doneTodo: (id) => void;
  }

const List: React.FC<ListProps> = ({deleteTodo, doneTodo}) => {

    const { TabState } = useTabState();
    
    const { datas, loading } = useContext(TableContext) ?? { datas: [], loading: false };

    const handleDelete = (todoIdToDelete) => {
        deleteTodo(todoIdToDelete);
      };

    const handleDone = (todoIdToDelete) => {
        doneTodo(todoIdToDelete);
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
                <th className='w-36'></th>
              </tr>
            </thead>
            <tbody className=' border-black text-[20px]'>
              {datas.map((data, index) => (
                <tr key={index} className='border-black border-[1px]'>
                  <td className='h-[50px]'>{data.toDo}</td>
                  <td >{data.dueDate}</td>
                  <td >{data.status}</td>
                  <td className='flex flex-row justify-around items-center'>
                    {/* <button onClick={() => handleDelete(data.id)} className='flex items-center justify-center'>
                      <img src={trash}/>
                    </button> */}
                    {TabState !== 2 && <button onClick={() => handleDone(data.id)}>DONE</button>}
                    <button onClick={() => handleDelete(data.id)}>DELETE</button>
                    <button>EDIT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
export default List;