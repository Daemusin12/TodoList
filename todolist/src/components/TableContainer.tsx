import { createContext, ReactNode } from 'react';
import { useState } from 'react';

interface TableContainerProps {
  datas: any[];
  children: ReactNode;
  datasPerPage: number;
  totalDatas: number;
  currentPage: number;
  paginate: (pageNumber: number) => void
}

interface TableContextValue {
  datas: any[];
  loading: boolean;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

function TableContainer(props: TableContainerProps) {
  const [loading, setLoading] = useState(false);

  const { datas, totalDatas, datasPerPage, currentPage, paginate } = props;
  const pageNumbers: number[] = [];
  const totalPages = Math.ceil(totalDatas / datasPerPage);

  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);

  // Calculate the range of page numbers to display
  let startPage = currentPage - 1;
  let endPage = currentPage + 1;
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, 3);
  }
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <TableContext.Provider value={{ datas: currentDatas, loading }}>
            {props.children}
          </TableContext.Provider>
        </div>
        <div className='flex flex-row justify-center'>
          <div className='m-8 flex rounded-lg text-[15px] border-[#ED6F00] border-[2px] overflow-hidden'>
            <ul className='flex flex-row '>
              {currentPage > 1 && (
                <li>
                  <button
                    className='rounded-md h-8 w-[80px] text-black'
                    onClick={() => paginate(currentPage - 1)}
                  >
                    PREVIOUS
                  </button>
                </li>
              )}
              {pageNumbers.map((number) => (
                <li key={number} className='border-[#ED6F00] border-r-[1px] border-l-[1px]'>
                  <button
                    className={`h-8 w-8 border-[#ED6F00] overflow-hidden ${number === currentPage ? 'bg-[#ED6F00] text-black' : ''
                      }`}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              {currentPage < totalPages && (
                <li>
                  <button
                    className='rounded-md h-8 w-[50px]'
                    onClick={() => paginate(currentPage + 1)}
                  >
                    NEXT
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableContainer;
export { TableContext };