import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { CargoResponse, Produto, ProdutoResponse, User, UserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { AdicionarProdutoSchema, adicionarUserSchema, AdicionarUserSchema } from '@/Schemas';
import { object } from 'zod';


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
  const [data, setData] = useState<Produto[]>([]);
  const [filteredData, setFilteredData] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin } = useAuth();
  const alert = useAlert();
  
  const [responseProduto, fetchDataEstoque] = useFetch<ProdutoResponse>();
  const [responseCategoria, fetchDataCategoria] = useFetch<CargoResponse>();
  const [responseAddProduto, fetchDataAddProduto] = useFetch<UserResponse>();
  const [responseEditEstoque, fetchDataEditEstoque] = useFetch<UserResponse>();
  const [responseDeleteEstoque, fetchDataDeleteEstoque ] = useFetch<UserResponse>();

  const [ categoria, setCategoria ] = useState<SelectData[]>([{ value: 0, text: '' }]);

  const [ selectedUser, setSelectedUser ] = useState<User | null>(null);
  const [ formData, setFormData ] = useState<EstoqueFormData>({ nome: '', email: '', cpf: '', cargo: {id:0, descricao: ''} });

  const [adicionarProduto, setAdicionarProduto] = useState<AdicionarProdutoSchema>({
    categoria : 0,
    custo: 0,
    descricao: '',
    preco: 0,
    quantidadeMaxima: 0,
    quantidadeMinima: 0,
    validade: ''
  });

  const [error , setError] = useState({cpf: '', cargo: ''})

  const [ addModalOpen, setAddModalOpen ] = useState(false);
  const [ editModalOpen, setEditModalOpen ] = useState(false);	
  const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);
  
  useEffect(() => {
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/produto?empresa=${dataLogin.empresa}`
    fetchDataEstoque(url, { headers: headers, method: 'GET' })
  },[responseAddProduto, dataLogin, responseDeleteEstoque, responseEditEstoque])

  useEffect(() => {
    if (!responseProduto || !responseProduto.data?.products) return;
    responseProduto.data?.products.map((item) => {
        if (!item.categoria) return;
       (item.categoria as any) = item.categoria.descricao
    })
    setData(responseProduto.data?.products || []);
    console.log(responseProduto.data, 'responseEstoque.data?.users')
    setFilteredData(responseProduto.data?.products.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseProduto.data?.products?.length ? responseProduto.data.products.length/10 : 1 ));
  }, [responseProduto.data, responseProduto, setData, responseAddProduto])
  
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataCategoria(`${api.url}/cargo?empresa=${dataLogin?.empresa}`, { method: 'GET', headers:headers })
    setFormData({ nome: user.nome, email: user.email, cpf: user.cpf, cargo: { id: user?.cargo?.id ? user.cargo.id : 0, descricao: user?.cargo?.descricao ? user.cargo.descricao: ''}});
    setEditModalOpen(true);
  }

  const handleAdd = () => {
    setAddModalOpen(true);
    if (!dataLogin) return;
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataCategoria(`${api.url}/cargo?empresa=${dataLogin?.empresa}`, { method: 'GET', headers:headers })
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
    const adicionarUserSchemaValidator = adicionarUserSchema.safeParse(adicionarProduto)
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
    const body = JSON.stringify({ ...adicionarProduto, cargo: adicionarProduto.cargo.value });
    const headers = { 'Authorization': `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataAddProduto(url, {body, headers, method: 'POST'});
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
    if (!responseCategoria) return;
    const data = responseCategoria.data?.cargos || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao,  }))
    setCategoria(dataFormated)
  }, [responseCategoria.data, responseCategoria])
  
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase().trim());

  useEffect(() => {
    const filtered = data.filter((item) => item.descricao.toLowerCase().includes(search));
    if (filtered.length < 10) return setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length/10));
    setPage(1);
    setFilteredData(filtered ? filtered.slice(0, 10) : [] );
  }, [search])

  const handleNextPage = () => {
    if (page >= totalPages) return;
    if(search) {
      const filtered = data.filter((item) => item.descricao.toLowerCase().includes(search));
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
      const filtered = data.filter((item) => item.descricao.toLowerCase().includes(search));
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
     
    data?.length > 0 ? 
    
        <Content.Root>
            <Content.Header title='Cadastro de Produto' text='' onClickToAdd={handleAdd}/>
            <Content.Search handleSearch={handleSearch} search={search} />
            <Content.Table 
            data={data} 
            filteredData={filteredData}
            handleBeforePage={handleBeforePage} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            handleNextPage={handleNextPage} 
            page={page}
            col={Object.keys(data[0]) as string[] } 
            />
            <Content.Delete 
            text='Deseja deletar esse produto?'
            setDeleteModalOpen={setDeleteModalOpen}
            deleteModalOpen={deleteModalOpen}
            selectedItem={selectedUser}
            onConfirmDeleteItem={onConfirmDeleteUser}
            title='Deletar Produto' 
        />

        <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen} >
          <Modal.Header title='Adicionar Produto' setShowModal={() => setAddModalOpen(false)}/>
          <Modal.Body>
            <Forms.Root>
                <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={handleChange} value={adicionarProduto?.descricao}/>
                <Forms.Input id='custo' type='text' arialabel='Custo' placeholder='Custo' onChangeAction={handleChange} value={adicionarProduto?.custo}/>
                <Forms.Input id='preco' type='text' arialabel='Preço' placeholder='Preço' onChangeAction={handleChange} value={adicionarProduto?.preco}/>
                <Forms.Input id='quantidadeMinima' type='text' arialabel='Quantidade Minima' placeholder='Quantidade Minima' onChangeAction={handleChange} value={adicionarProduto?.quantidadeMinima}/>
                <Forms.Input id='quantidadeMaxima' type='text' arialabel='Quantidade Maxima' placeholder='Quantidade Maxima' onChangeAction={handleChange} value={adicionarProduto?.quantidadeMaxima}/>
                <Forms.Input id='validade' type='text' arialabel='Validade' placeholder='Validade' onChangeAction={handleChange} value={adicionarProduto?.validade}/>
                <Forms.Select data={categoria} onValueChange={handleChange} value={adicionarProduto?.categoria}/>
            </Forms.Root>
          </Modal.Body>
            <Modal.Footer >
              <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
              <Modal.Button onClickFunction={onConfirmAddUser} type='success'>Aceitar</Modal.Button>
            </Modal.Footer>
        </Modal.Root>

      </Content.Root>
      :
      null
    
  );
}