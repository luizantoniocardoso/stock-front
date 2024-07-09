/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatterData } from "@/Utils";
import { Table } from "../Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Barcode } from "../Barcode";

interface ContentTableProps {
  data: any;
  filteredData: any;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
  handleBeforePage: () => void;
  handleNextPage: () => void;
  page: number;
  col: string[];
  title: string;
  permission: boolean;
}

export const ContentTable = ({ data, filteredData, handleBeforePage, handleDelete, handleEdit, handleNextPage, page, col, title, permission}: ContentTableProps) => {




  return (
    <section className='px-8'>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {col.map((item, index) => (
              <Table.Cell aling="center" key={index}>{item}</Table.Cell>
            ))}
             <Table.Cell aling="center">
              Editar
            </Table.Cell>
            <Table.Cell aling="center">
              Deletar
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredData && filteredData.length > 0 ? filteredData.map((item: any, index: number) => (
            <Table.Row key={index}>
              {col.map((colItem, colIndex) => (
               colItem === 'codigoBarras' ?<Table.Cell key={colIndex} aling="center"><Barcode value={item[colItem]}/></Table.Cell>
               : <Table.Cell aling="center" key={colIndex}>{formatterData(item[colItem])}</Table.Cell> 
                
              ))}
              <Table.Cell aling="center">
                <button onClick={() => handleEdit(item)} disabled={!permission}><FontAwesomeIcon icon={faPen} /></button>
              </Table.Cell>
              <Table.Cell aling="center">
                <button onClick={() => handleDelete(item)} disabled={!permission}><FontAwesomeIcon icon={faTrash} /></button>
              </Table.Cell>
            </Table.Row>
          ))
           
          
          : (
            <Table.Row>
              <Table.Cell collSpan={col.length + 2}>
                <p className='text-center align-middle'>Sem Dados</p>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell collSpan={2}>
              <p className='text-center align-middle'>Total de {title}: {data.length}</p>
            </Table.Cell>
            <Table.Cell collSpan={2}>
              <p className='text-center align-middle'>{title} Filtrados: {filteredData.length}</p>
            </Table.Cell>
            <Table.Cell collSpan={4}>
              {/* paginação */}
              <div>
                <button onClick={handleBeforePage} className='px-2 py-1 border rounded-lg border-textVar hover:bg-textVar hover:text-white hover:border-transparent'>Anterior</button>
                <span className='px-2 py-1 border rounded-lg border-textVar'>{page}</span>
                <button onClick={handleNextPage} className='px-2 py-1 border rounded-lg border-textVar hover:bg-textVar hover:text-white hover:border-transparent'>Proximo</button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </section>
  );
}
