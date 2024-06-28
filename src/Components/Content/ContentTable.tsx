/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatterData } from "@/Utils";
import { Table } from "../Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ContentTableProps {
  data: any;
  filteredData: any;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
  handleBeforePage: () => void;
  handleNextPage: () => void;
  page: number;
  col: string[];
}

export const ContentTable = ({ data, filteredData, handleBeforePage, handleDelete, handleEdit, handleNextPage, page, col }: ContentTableProps) => {
  return (
    <section className='px-8'>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {col.map((item, index) => (
              <Table.Cell key={index}>{item}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredData && filteredData.length > 0 ? filteredData.map((item: any, index: number) => (
            <Table.Row key={index}>
              {col.map((colItem, colIndex) => (
                <Table.Cell key={colIndex}>{formatterData(item[colItem.toLowerCase()])}</Table.Cell>
              ))}
              <Table.Cell>
                <button onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPen} /></button>
              </Table.Cell>
              <Table.Cell>
                <button onClick={() => handleDelete(item)}><FontAwesomeIcon icon={faTrash} /></button>
              </Table.Cell>
            </Table.Row>
          )) : (
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
              <p className='text-center align-middle'>Total de Usuarios: {data.length}</p>
            </Table.Cell>
            <Table.Cell collSpan={2}>
              <p className='text-center align-middle'>Usuarios Filtrados: {filteredData.length}</p>
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
