import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { CargoResponse, User, UserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarUserSchema, AdicionarUserSchema } from '@/Schemas';


interface EstoqueFormData {
  nome: string;
  email: string;
  cpf: string;
  cargo: {
    id: number;
    descricao: string;
  };
  
}

export function CadastroProduto() {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin } = useAuth();

  const [responseEstoque, fetchDataEstoque] = useFetch<UserResponse>();
  const [responseCargos, fetchDataCargos] = useFetch<CargoResponse>();
  const [responseAddEstoque, fetchDataAddEstoque] = useFetch<UserResponse>();
  const [responseEditEstoque, fetchDataEditEstoque] = useFetch<UserResponse>();
  const [responseDeleteEstoque, fetchDataDeleteEstoque ] = useFetch<UserResponse>();

  const [ cargos, setCargos ] = useState<SelectData[]>([{ value: 0, text: '' }]);
  const [ selectedUser, setSelectedUser ] = useState<User | null>(null);
  const [ formData, setFormData ] = useState<EstoqueFormData>({ nome: '', email: '', cpf: '', cargo: {id:0, descricao: ''} });

  const alert = useAlert();

  const [adicionarUser, setAdicionarUser] = useState<AdicionarUserSchema>({ cpf: '', cargo: { value: 0, text: 'Escolha um Cargo'} });

  const [error , setError] = useState({cpf: '', cargo: ''})

  const [ addModalOpen, setAddModalOpen ] = useState(false);
  const [ editModalOpen, setEditModalOpen ] = useState(false);	
  const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);
  
  useEffect(() => {
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/usuario?estoque=${dataLogin.empresa}`
    fetchDataEstoque(url, { headers: headers, method: 'GET' })
  },[responseAddEstoque, dataLogin, responseDeleteEstoque, responseEditEstoque])

  useEffect(() => {
    if (!responseEstoque) return;
    setData(responseEstoque.data?.users || []);
    console.log(responseEstoque.data, 'responseEstoque.data?.users')
    setFilteredData(responseEstoque.data?.users.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseEstoque.data?.users?.length ? responseEstoque.data.users.length/10 : 1 ));
  }, [responseEstoque.data, responseEstoque, setData, responseAddEstoque])
  
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataCargos(`${api.url}/cargo?empresa=${dataLogin?.empresa}`, { method: 'GET', headers:headers })
    setFormData({ nome: user.nome, email: user.email, cpf: user.cpf, cargo: { id: user?.cargo?.id ? user.cargo.id : 0, descricao: user?.cargo?.descricao ? user.cargo.descricao: ''}});
    setEditModalOpen(true);
  }

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => setAdicionarUser({ ...adicionarUser, cpf: e.target.value})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCargoChange = (e: any) => setAdicionarUser(e ? { ...adicionarUser, cargo: e} : { ...adicionarUser, cargo: { id: 0, descricao: ''}})

  const handleAdd = () => {
    setAddModalOpen(true);
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataCargos(`${api.url}/cargo?empresa=${dataLogin?.empresa}`, { method: 'GET', headers:headers })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id , value } = e?.target ? e.target : { id: '', value: ''};
    if(!e?.target){
      if(!e || !e.value || !e.text) return;
      setFormData((prevData) => ({...prevData,cargo: e}));
      return;
    }
    setFormData((prevData) => ({...prevData,[id]: value}));
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
    const url = `${api.url}/usuario/adicionar?empresa=${dataLogin?.empresa}`;
    const body = JSON.stringify({ ...adicionarUser, cargo: adicionarUser.cargo.value });
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataAddEstoque(url, {body, headers, method: 'POST'});
    alert.openAlert({text: 'Usuario Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {}})
  }

  const onConfirmDeleteUser =  () => {
    setDeleteModalOpen(false);
    if (!selectedUser) return;
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/usuario/${selectedUser.id}?empresa=${dataLogin.empresa}`
    fetchDataDeleteEstoque(url, { headers: headers, method: 'DELETE' })
    
    alert.openAlert({text: 'Usuario Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {}})
  }

  const onConfirmEditUser = () => {
    setEditModalOpen(false);
    if (!selectedUser) return;
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/usuario/${selectedUser.id}?empresa=${dataLogin.empresa}`
    const body = JSON.stringify({ ...formData, cargo: formData.cargo.id });
    fetchDataEditEstoque(url, {body, headers, method: 'PUT'});
    
    alert.openAlert({text: 'Usuario Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {}})
  }

  useEffect(() => {
    if (!responseCargos) return;
    const data = responseCargos.data?.cargos || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao,  }))
    setCargos(dataFormated)
  }, [responseCargos.data, responseCargos])
  
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase().trim());

  useEffect(() => {
    const filtered = data.filter((item) => item.nome.toLowerCase().includes(search));
    if (filtered.length < 10) return setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length/10));
    setPage(1);
    setFilteredData(filtered ? filtered.slice(0, 10) : [] );
  }, [search])

  const handleNextPage = () => {
    if (page >= totalPages) return;
    if(search) {
      const filtered = data.filter((item) => item.nome.toLowerCase().includes(search));
      const start = (page * 10);
      const end = start + 10;
      setFilteredData(filtered.slice(start, end));
      setPage(page + 1);
      return;
    }
    
    setPage(page + 1);
    const start = (page * 10);
    const end = start + 10;
    setFilteredData(data.slice(start, end));
  }

  const handleBeforePage = () => {
    if (page <= 1) return;
    if (search) {
      const filtered = data.filter((item) => item.nome.toLowerCase().includes(search));
      const start = (page - 2) * 10;
      const end = start + 10;
      setFilteredData(filtered.slice(start, end));
      setPage(page - 1);
      return;
    }
    setPage(page - 1);
    const start = (page - 2) * 10;
    const end = start + 10;
    setFilteredData(data.slice(start, end));
  }

  return (
      <Content.Root>
        <Content.Header title='Cadastro de Estoque' text='mudar texto dps ' onClickToAdd={handleAdd}/>
        <Content.Search handleSearch={handleSearch} search={search} />
        <Content.Table 
        data={data} 
        filteredData={filteredData}
        handleBeforePage={handleBeforePage} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        handleNextPage={handleNextPage} 
        page={page}
        col={['Nome', 'Email', 'Cpf', 'Cargo']} 
        />
        <Content.Delete 
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedUser}
        onConfirmDeleteItem={onConfirmDeleteUser} 
        />

        <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen} >
          <Modal.Header title='Adicionar Usuario' setShowModal={() => setAddModalOpen(false)}/>
          <Modal.Body>
            <Forms.Root>
              <Forms.Title text='Adicionar Usuario' aling='center'/>
              <Forms.Input id='cpf' type='text' arialabel='Cpf' placeholder='Cpf' onChangeAction={handleCpfChange}>
                {error.cpf && <Forms.Small id="cpf" text={error.cpf} />}
              </Forms.Input>
              <Forms.Select  data={cargos}  onValueChange={handleCargoChange} preventFirstSelectionprop={false}/>
                {error.cargo && <Forms.Small id="cargo" text={error.cargo} />}
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
                <Forms.Input id='nome'  type='text' arialabel='Nome' placeholder='Nome' onChangeAction={handleChange} value={formData?.nome}>
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
      </Content.Root>
    
  );
}