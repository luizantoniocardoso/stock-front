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

  const [deleteEntrada, fetchDataDeleteEntrada] = useFetch<Entrada>();
  const [deleteSaida, fetchDataDeleteSaida] = useFetch<Saida>();

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
  const [isEntrada, setIsEntrada] = useState(true);

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };

    const urlEntrada = `${api.url}/entrada?empresa=${dataLogin.empresa}`;
    fetchDataEntrada(urlEntrada, { headers: headers, method: 'GET' });
    const urlSaida = `${api.url}/saida?empresa=${dataLogin.empresa}`;
    fetchDataSaida(urlSaida, { headers: headers, method: 'GET' });
  }, [responseAddEntrada, dataLogin] );



  useEffect(() => {
    if (!responseEntrada.data)return  
      return setDataEntrada(responseEntrada.data.entradas);
  }, [responseEntrada.data])

  useEffect(() => {
    if (Array.isArray(responseSaida.data)) {
      setDataSaida(responseSaida.data);
    }
  }, [responseSaida.data]);

  useEffect(() => {
    const allData = [...dataEntrada, ...dataSaida];
    setFilteredData(allData.slice(0, 10));
    setTotalPages(Math.ceil(allData.length / 10));
  }, [dataEntrada, dataSaida]);

  const handleAdd = () => {
  
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarEntradaSaida((prevData) => ({
      ...prevData,
      [id]: Number(value)
    }));
  };

  const handleSelectChange = (e: SelectData, id: string) => {
    setAdicionarEntradaSaida((prevData) => ({ ...prevData, [id]: e.value }));
  };

  const onConfirmAddEntradaSaida = () => {
    const adicionarEntradaSaidaSchemaValidator = adicionarEntradaSaidaSchema.safeParse(adicionarEntradaSaida);
    if (!adicionarEntradaSaidaSchemaValidator.success) {
      setError({
        quantidade: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'quantidade')?.message || '',
        lote: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'lote')?.message || '',
        fornecedor: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'fornecedor')?.message || '',
        produto: adicionarEntradaSaidaSchemaValidator.error.errors.find((error) => error.path[0] === 'produto')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/${isEntrada ? 'entrada' : 'saida'}?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarEntradaSaida);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddEntrada(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: `Registro de ${isEntrada ? 'Entrada' : 'Saída'} Adicionado`, type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  useEffect(() => {
    if (!responseLote) return;
    const data = responseLote.data?.lotes || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao }));
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



    return setAddModalOpen(true);
  };

  return  (
    <Content.Root>
      <Content.Header title='Cadastro de Entrada' text='' onClickToAdd={() => handleAdd()} permission={permission}/>

     <div className='flex justify-between w-full px-8'>
      <Content.Tabs activeTab={tab} setActiveTab={setTab} tabs={[{label: 'Entradas'}, {label: 'Saidas'}]} ></Content.Tabs>
      <Content.Search handleSearch={handleSearch} search={search} />
     </div>
      
      <Content.Table
        permission={permission}
        data={[...dataEntrada, ...dataSaida]}
        filteredData={filteredData}
        handleBeforePage={() => console.log('before')}
        handleNextPage={() => console.log('next')}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        page={page}
        col={['descricao', 'quantidade', 'lote', 'fornecedor', 'produto', 'tipo']}
        title='Entradas e Saídas'
      />
      <Content.Delete
        text='Deseja deletar esse registro?'
        setDeleteModalOpen={setAddModalOpen}
        deleteModalOpen={addModalOpen}
        selectedItem={null}
        onConfirmDeleteItem={handleDelete}
        title='Deletar Registro'
      />

    
    </Content.Root>
  ) 
}
