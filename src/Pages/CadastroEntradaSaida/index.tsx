/* eslint-disable @typescript-eslint/no-explicit-any */
import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { LoteResponse, FornecedorResponse, ProdutoResponse, EntradaResponse, SaidaResponse, Saida, Entrada } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarEntradaSaidaSchema, AdicionarEntradaSaidaSchema } from '@/Schemas';

export function CadastroEntradaSaida() {
  const [dataEntrada, setDataEntrada] = useState<Entrada[]>([]);
  const [dataSaida, setDataSaida] = useState<Saida[]>([]);
  const [selectedItem, setSelectedItem] = useState<Entrada | Saida | null>(null);

  const [filteredData, setFilteredData] = useState<Entrada[] | Saida[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const [tab, setTab] = useState(0);

  const { dataLogin, user } = useAuth();
  const alert = useAlert();

  const [responseEntrada, fetchDataEntrada] = useFetch<EntradaResponse>();
  const [responseSaida, fetchDataSaida] = useFetch<SaidaResponse>();
  
  const [responseLote, fetchDataLote] = useFetch<LoteResponse>();
  const [responseFornecedor, fetchDataFornecedor] = useFetch<FornecedorResponse>();
  const [responseProduto, fetchDataProduto] = useFetch<ProdutoResponse>();

  const [responseAddEntrada, fetchDataAddEntrada] = useFetch<Entrada>();
  const [responseAddSaida, fetchDataAddSaida] = useFetch<Saida>();

  const [editEntrada, fetchDataEditEntrada] = useFetch<Entrada>();
  const [editSaida, fetchDataEditSaida] = useFetch<Saida>();

  const [deleteEntradaSaida, fetchDataDeleteEntradaSaida] = useFetch<Entrada>();

  const [lotes, setLotes] = useState<SelectData[]>([{ value: 0, text: '' }]);
  const [fornecedores, setFornecedores] = useState<SelectData[]>([{ value: 0, text: '' }]);
  const [produtos, setProdutos] = useState<SelectData[]>([{ value: 0, text: '' }]);

  const [adicionarEntradaSaida, setAdicionarEntradaSaida] = useState<AdicionarEntradaSaidaSchema>({
    quantidade: 0,
    lote: 0,
    fornecedor: 0,
    produto: 0
  });

  const [error, setError] = useState({
    quantidade: '',
    lote: '',
    fornecedor: '',
    produto: ''
  });

  const permission = user?.cargo?.nivel === 'ADMIN' ? true : false

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const urlEntrada = `${api.url}/entrada?empresa=${dataLogin.empresa}`;
    const urlSaida = `${api.url}/saida?empresa=${dataLogin.empresa}`;

    fetchDataEntrada(urlEntrada, { headers: headers, method: 'GET' });
    fetchDataSaida(urlSaida, { headers: headers, method: 'GET' });
    fetchDataLote(`${api.url}/lote?empresa=${dataLogin.empresa}`, { headers: headers, method: 'GET' });
    fetchDataFornecedor(`${api.url}/fornecedor?empresa=${dataLogin.empresa}`, { headers: headers, method: 'GET' });
    fetchDataProduto(`${api.url}/produto?empresa=${dataLogin.empresa}`, { headers: headers, method: 'GET' });

  }, [responseAddEntrada, dataLogin, tab, deleteEntradaSaida] );



  useEffect(() => {
    if (!responseEntrada) return;
    setDataEntrada(responseEntrada.data?.entradas || []);
  }, [responseEntrada.data, responseEntrada, deleteEntradaSaida.data, deleteEntradaSaida, tab]);

  useEffect(() => {
    if (!responseSaida) return;
    setDataSaida(responseSaida.data?.saidas || []);
  }, [responseSaida.data, responseSaida, deleteEntradaSaida.data, deleteEntradaSaida, tab]);
  

  useEffect(() => {
    const data = tab === 0 ? dataEntrada : dataSaida;
    console.log(data);
    setFilteredData(data.slice(0, 10));
    setTotalPages(Math.ceil(data.length / 10));
  }, [dataEntrada, dataSaida]);

  const handleAdd = () => {
    setAdicionarEntradaSaida({
      quantidade: 0,
      lote: 0,
      fornecedor: 0,
      produto: 0
    });
    setAddModalOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarEntradaSaida((prevData) => ({
      ...prevData,
      [id]: Number(value)
    }));
  };

  const handleSelectChange = (e: SelectData, id: string) => {
    if (id === 'lote') return setAdicionarEntradaSaida((prevData) => ({ ...prevData, lote: e.value }));
    if (id === 'fornecedor') return setAdicionarEntradaSaida((prevData) => ({ ...prevData, fornecedor: e.value }));
    if (id === 'produto') return setAdicionarEntradaSaida((prevData) => ({ ...prevData, produto: e.value }));
    
  };


  useEffect(() => {
    if (!responseLote) return;
    const data = responseLote.data?.lotes || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.observacoes }));
    setLotes(dataFormated);
  }, [responseLote.data, responseLote]);

  useEffect(() => {
    if (!responseFornecedor) return;
    const data = responseFornecedor.data?.fornecedores || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao }));
    setFornecedores(dataFormated);
  }, [responseFornecedor.data, responseFornecedor]);

  useEffect(() => {
    if (!responseProduto) return;
    const data = responseProduto.data?.products || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao }));
    setProdutos(dataFormated);
  }, [responseProduto.data, responseProduto]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase().trim());

  const handleEdit = (item: any) => {
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const onConfirmDeleteItem = () => {
    const url = `${api.url}/${tab === 0 ? 'entrada' : 'saida'}/${selectedItem?.id}?empresa=${dataLogin?.empresa}`;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataDeleteEntradaSaida(url, { headers, method: 'DELETE' });
    alert.openAlert({title: 'Deletar Registro', text: 'Registro deletado com sucesso', type: 'success', time: 5000, onCloseAlert: () => {}});
    setDeleteModalOpen(false);
  }


  useEffect(() => {
    const data = tab === 0 ? dataEntrada : dataSaida;
    const filtered = data.filter((item) => item.id.toString().toLowerCase().includes(search));
    if (filtered.length < 10) return setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setPage(1);
    setFilteredData(filtered ? filtered.slice(0, 10) : []);
  }, [search]);

  const handleNextPage = () => {
    const data = tab === 0 ? dataEntrada : dataSaida;

    if (page >= totalPages) return;
    if (search) {
      const filtered = data.filter((item) => item.id.toString().toLowerCase().includes(search));
      const start = page * 10;
      const end = start + 10;
      setFilteredData(filtered.slice(start, end));
      setPage(page + 1);
      return;
    }

    setPage(page + 1);
    const start = page * 10;
    const end = start + 10;
    setFilteredData(data.slice(start, end));
  };

  const handleBeforePage = () => {
    if (page <= 1) return;
    if (search) {
      const data = tab === 0 ? dataEntrada : dataSaida;
      const filtered = data.filter((item) => item.id.toString().includes(search));
      const start = (page - 2) * 10;
      const end = start + 10;
      setFilteredData(filtered.slice(start, end));
      setPage(page - 1);
      return;
    }
    setPage(page - 1);
    const data = tab === 0 ? dataEntrada : dataSaida;
    const start = (page - 2) * 10;
    const end = start + 10;
    setFilteredData(data.slice(start, end));
  };



  const onConfirmAddEntradaSaida = () => {
    console.log(adicionarEntradaSaida);
    const adicionarEntradaSaidaSchemaValidator = adicionarEntradaSaidaSchema.safeParse(adicionarEntradaSaida);
    if (!adicionarEntradaSaidaSchemaValidator.success) {
      setError({
        quantidade: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'quantidade')?.message || '',
        lote: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'lote')?.message || '',
        fornecedor: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'fornecedor')?.message || '',
        produto: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'produto')?.message || ''
      });
      return
    }
      setAddModalOpen(false);
      const url = `${api.url}/${tab === 0 ? 'entrada' : 'saida'}?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarEntradaSaida);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      tab === 0 ? fetchDataAddEntrada(url, { body, headers, method: 'POST' }) : fetchDataAddSaida(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Entrada/Saida Adicionada', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
      
    
  }


  return  (
    <Content.Root>
      <Content.Header title={`Cadastro de ${tab === 0 ? 'Entrada' : 'Saida'}`} text='' onClickToAdd={() => handleAdd()} permission={permission}/>

     <div className='flex justify-between w-full px-8'>
      <Content.Tabs activeTab={tab} setActiveTab={setTab} tabs={[{label: 'Entradas'}, {label: 'Saidas'}]} ></Content.Tabs>
      <Content.Search handleSearch={handleSearch} search={search} />
     </div>
      
      {
        tab === 0 ? (
          <Content.Table
            data={dataEntrada}
            filteredData={filteredData}
            handleBeforePage={handleBeforePage}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleNextPage={handleNextPage}
            page={page}
            col={ dataEntrada.length > 0 ? Object.keys(dataEntrada[0]) : []}
            title='Entradas'
            permission={permission}
          />
        ) : (
          <Content.Table
            data={dataSaida}
            filteredData={filteredData}
            handleBeforePage={handleBeforePage}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleNextPage={handleNextPage}
            page={page}
            col={dataSaida.length > 0 ? Object.keys(dataSaida[0]) : []}
            title='Saidas'
            permission={permission}
          />
        )
      }
      <Content.Delete
        text='Deseja deletar esse registro?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedItem}
        onConfirmDeleteItem={onConfirmDeleteItem}
        title='Deletar Registro'
      />
     
      <Modal.Root showModal={addModalOpen} setShowModal={setAddModalOpen}>
          <Modal.Header title={`Adicionar ${tab === 0 ? 'Entrada' : 'Saida'}`} setShowModal={() => setAddModalOpen(false)} />
          <Forms.Root>
              <Forms.Input id='quantidade' type='number' arialabel='Quantidade' placeholder='Quantidade' onChangeAction={handleChange} value={adicionarEntradaSaida.quantidade}>
                {error.quantidade && <Forms.Small id="quantidade" text={error.quantidade} />}
              </Forms.Input>
              <Forms.Select data={lotes} id='lote' onValueChange={(e) => handleSelectChange(e, 'lote')} value={adicionarEntradaSaida.lote} />
              <br />
              <Forms.Select data={fornecedores} id='fornecedor' onValueChange={(e) => handleSelectChange(e, 'fornecedor')} value={adicionarEntradaSaida.fornecedor} />
              <br />
              <Forms.Select data={produtos} id='produto' onValueChange={(e) => handleSelectChange(e, 'produto')} value={adicionarEntradaSaida.produto} />
              
          </Forms.Root>  
          <Modal.Footer>
              <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
              <Modal.Button onClickFunction={ onConfirmAddEntradaSaida} type='success'>Adicionar</Modal.Button>
          </Modal.Footer>
      </Modal.Root>



      
    </Content.Root>
  ) 
}
