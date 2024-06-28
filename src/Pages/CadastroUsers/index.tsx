import { Forms, Modal, Table } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { CargoResponse, User, UserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';
import { formatterData } from '@/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarUserSchema, AdicionarUserSchema } from '@/Schemas';


interface UserFormData {
  nome: string;
  email: string;
  cpf: string;
  cargo: {
    id: number;
    descricao: string;
  };
  
}

export function CadastroUsers() {
  const [data, setData] = useState<User[]>([]);
  const { dataLogin } = useAuth();
  const [responseUsers, fetchDataUsers] = useFetch<UserResponse>();
  const [responseCargos, fetchDataCargos] = useFetch<CargoResponse>();
  const [ cargos, setCargos ] = useState<SelectData[]>([{ value: 0, text: '' }]);
  const [ selectedUser, setSelectedUser ] = useState<User | null>(null);
  const [ formData, setFormData ] = useState<UserFormData>({ nome: '', email: '', cpf: '', cargo: {id:0, descricao: ''} });
  const alert = useAlert();

  const [adicionarUser, setAdicionarUser] = useState<AdicionarUserSchema>({cargo: {id: 0, descricao: ''}, cpf: ''});
  const [error , setError] = useState({cpf: '', cargo: ''})

  
  const [ addModalOpen, setAddModalOpen ] = useState(false);
  const [ editModalOpen, setEditModalOpen ] = useState(false);	
  const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);
  
  useEffect(() => {
    if (!dataLogin) return;
    const headers ={ Authorization: `Bearer ${dataLogin.token}`}
    const url = `${api.url}/usuario?empresa=${dataLogin.empresa}`
    fetchDataUsers(url, { headers: headers, method: 'GET' })
  },[])

  useEffect(() => {
    if (!responseUsers) return;
    setData(responseUsers.data?.users || []);
    console.log(responseUsers.data)
  }, [responseUsers.data, responseUsers, setData])
  
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    if (!dataLogin) return;
    const headers ={ Authorization: `Bearer ${dataLogin.token}`}
    fetchDataCargos(`${api.url}/cargo?empresa=${dataLogin?.empresa}`, { method: 'GET', headers:headers })
    setFormData({ nome: user.nome, email: user.email, cpf: user.cpf, cargo: { id: user?.cargo?.id ? user.cargo.id : 0, descricao: user?.cargo?.descricao ? user.cargo.descricao: ''}});
    setEditModalOpen(true);
  }


  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => setAdicionarUser({ ...adicionarUser, cpf: e.target.value})
  const handleCargoChange = (e: SelectData) => {setAdicionarUser({ ...adicionarUser, cargo: { id: typeof e.value === 'number' ? e.value : 0, descricao: e?.text ? e.text: '' } })}
  const handleAdd = () => {
    setAddModalOpen(true);
    if (!dataLogin) return;
    const headers ={ Authorization: `Bearer ${dataLogin.token}`}
    fetchDataCargos(`${api.url}/cargo?empresa=${dataLogin?.empresa}`, { method: 'GET', headers:headers })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if (e.target) {
      
      const { name, value } = e.target;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
      console.log(formData)

      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((e as any).value ) setFormData({ ...formData, cargo: { id: typeof e.value === 'number' ? e.value : 0, descricao: e?.text ? e.text: '' } });
    console.log(formData)

    
  };
  const onConfirmAddUser = () => {
    const adicionarUserSchemaValidator = adicionarUserSchema.safeParse(adicionarUser)
    if(!adicionarUserSchemaValidator.success){
      setError( { 
          cargo: adicionarUserSchemaValidator.error.formErrors.fieldErrors.cargo ? adicionarUserSchemaValidator.error.formErrors.fieldErrors.cargo[0] : '',
          cpf: adicionarUserSchemaValidator.error.formErrors.fieldErrors.cpf ? adicionarUserSchemaValidator.error.formErrors.fieldErrors.cpf[0] : ''
      });
            return;
    }
    setError({cargo: '', cpf: ''})
    setAddModalOpen(false);
    alert.openAlert({text: 'Usuario Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {}})
  }

  const onConfirmDeleteUser =  () => {
    setDeleteModalOpen(false);
    console.log(selectedUser)
    alert.openAlert({text: 'Usuario Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {}})
  }

  const onConfirmEditUser = () => {
    setEditModalOpen(false);
    
    console.log(formData)
    alert.openAlert({text: 'Usuario Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {}})
  }

  useEffect(() => {
    if (!responseCargos) return;
    const data = responseCargos.data?.cargos || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao }))
    setCargos(dataFormated)
    
  }, [responseCargos.data, responseCargos])

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
              <Forms.Input id='cpf' type='text' arialabel='Cpf' placeholder='Cpf' onChangeAction={handleCpfChange}>
                {error.cpf && <Forms.Small id="cpf" text={error.cpf} />}
              </Forms.Input>
              <Forms.Select  data={cargos} onValueChange={handleCargoChange}/>
            </Forms.Root>
          </Modal.Body>
            <Modal.Footer >
              <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
              <Modal.Button onClickFunction={onConfirmAddUser} type='success'>Aceitar</Modal.Button>
            </Modal.Footer>
      </Modal.Root>
      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen} >
          <Modal.Header title='Editar Usuario' setShowModal={() => setEditModalOpen(false)}/>
          <Modal.Body>
            <Forms.Root>
              <Forms.Title text='Editar Usuario' aling='center'/>
              <Forms.Input id='nome' type='text' arialabel='Nome' placeholder='Nome' onChangeAction={handleChange} value={formData?.nome}>
                {error.cargo && <Forms.Small id="cargo" text={error.cargo} />}
              </Forms.Input>
              <Forms.Input id='email' type='email' arialabel='Email' placeholder='Email' onChangeAction={handleChange} value={formData?.email}>
                {error.cargo && <Forms.Small id="cargo" text={error.cargo} />}
              </Forms.Input>
              <Forms.Input id='cpf' type='text' arialabel='Cpf' placeholder='Cpf' onChangeAction={handleChange} value={formData?.cpf}>
                {error.cpf && <Forms.Small id="cpf" text={error.cpf} />}
              </Forms.Input>
              <Forms.Select  data={cargos} onValueChange={handleChange} value={formData?.cargo?.id || 0}/>
            </Forms.Root>
          </Modal.Body>
            <Modal.Footer >
              <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
              <Modal.Button onClickFunction={onConfirmEditUser} type='success'>Aceitar</Modal.Button>
            </Modal.Footer>
      </Modal.Root>
      <Modal.Root setShowModal={setDeleteModalOpen} showModal={deleteModalOpen} >
          <Modal.Header title='Deletar Usuario' setShowModal={() => setDeleteModalOpen(false)}/>
          <Modal.Body>
            <p>Tem certeza que deseja deletar o usuario?</p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Button onClickFunction={() => setDeleteModalOpen(false)} type='danger'>Cancelar</Modal.Button>
            <Modal.Button onClickFunction={onConfirmDeleteUser} type='success'>Aprovar</Modal.Button>
          </Modal.Footer>
      </Modal.Root>
    </main>
    
  );
}