import { Forms, Modal, Table } from '@/Components';
import { api } from '@/Enviroments';
import { useAuth, useFetch } from '@/Hooks';
import { User, UserResponse } from '@/Interfaces/Api';
import { useEffect, useState } from 'react';
import { formatterData } from '@/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export function CadastroUsers() {
  const [data, setData] = useState<User[]>([]);
  const { dataLogin } = useAuth();
  const [response, fetchData] = useFetch<UserResponse>();
  const [ addModalOpen, setAddModalOpen ] = useState(false);

  useEffect(() => {
    if (!dataLogin) return;
    const headers ={ Authorization: `Bearer ${dataLogin.token}`}
    const url = `${api.url}/usuario?empresa=${dataLogin.empresa}`
    fetchData(url, { headers: headers, method: 'GET' })
  },[])

  useEffect(() => {
    if (!response) return;
    setData(response.data?.users || []);
    console.log(response.data)
  }, [response.data, response, setData])
  
  const handleDelete = (user: User) => {
    console.log('Deletar', user)
  }

  const handleEdit = (user: User) => {
    console.log('Editar', user)
  }

  const handleAdd = () => {
    setAddModalOpen(true);
  }

  return (
    <main className='w-full'>
      <section className='flex justify-between w-full py-2 sm:px-8 lg:px-8'>
        <div>
          <h1 className='text-2xl font-bold'>Cadastro de Usuários</h1>
          <p>Analize, cadastre e coisaradas</p>
        </div>
        <div>
          <button onClick={ handleAdd } className="flex items-center gap-3 px-4 py-1 border rounded-lg border-textVar hover:bg-textVar hover:text-white hover:border-transparent">
            <FontAwesomeIcon icon={faPlus} /> Adicionar
          </button>
        </div>
      </section>
      <section className='flex justify-end w-full py-2 sm:px-8 lg:px-8 '>
        <div>
          <input type="text" className='w-full px-4 py-1 border rounded-lg border-textVar' placeholder='Pesquisar' />
        </div>
      </section>
      <section className='px-8'>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Nome      </Table.Cell>
              <Table.Cell>Cpf       </Table.Cell>
              <Table.Cell>Email     </Table.Cell>
              <Table.Cell>Criado    </Table.Cell>
              <Table.Cell>Atualizado</Table.Cell>
              <Table.Cell>Cargo     </Table.Cell>
              <Table.Cell>Editar    </Table.Cell>
              <Table.Cell>Excluir   </Table.Cell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              data && data.length > 0 ? data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{formatterData(item?.nome)}                       </Table.Cell>
                  <Table.Cell>{formatterData(item?.cpf)}                        </Table.Cell>
                  <Table.Cell>{formatterData(item?.email)}                      </Table.Cell>
                  <Table.Cell>{formatterData(item?.createdAt)}                  </Table.Cell>
                  <Table.Cell>{formatterData(item?.updatedAt)}                  </Table.Cell>
                  <Table.Cell>{formatterData(item?.cargo?.descricao)}           </Table.Cell>
                  <Table.Cell><button onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPen}/></button>    </Table.Cell>
                  <Table.Cell><button onClick={() => handleDelete(item)}><FontAwesomeIcon icon={faTrash}/></button></Table.Cell>
                </Table.Row>
              ))
            :
              <Table.Row>
                <Table.Cell collSpan={6}>
                  <p className='text-center align-middle'>Sem Dados</p>
                </Table.Cell>
              </Table.Row>

            }
          </Table.Body>
        </Table.Root>
      </section>
      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen} >
          <Modal.Header title='Adicionar Usuario' setShowModal={() => setAddModalOpen(false)}/>
          <Modal.Body>
            <Forms.Root>
              <Forms.Title text='Adicionar Usuario' aling='center'/>
              <Forms.Input id='nome' type='text' arialabel='Nome' placeholder='Nome' />
            </Forms.Root>
          </Modal.Body>
      </Modal.Root>
    </main>
    
  );
}