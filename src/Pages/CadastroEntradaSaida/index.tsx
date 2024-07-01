import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { LoteResponse, FornecedorResponse, ProdutoResponse, EntradaSaidaResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarEntradaSaidaSchema, AdicionarEntradaSaidaSchema } from '@/Schemas';

export function CadastroEntradaSaida() {
  const [dataEntrada, setDataEntrada] = useState<EntradaSaidaResponse[]>([]);
  const [dataSaida, setDataSaida] = useState<EntradaSaidaResponse[]>([]);
  const [filteredData, setFilteredData] = useState<EntradaSaidaResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin } = useAuth();
  const alert = useAlert();

  const [responseEntrada, fetchDataEntrada] = useFetch<EntradaSaidaResponse>();
  const [responseSaida, fetchDataSaida] = useFetch<EntradaSaidaResponse>();
  const [responseLote, fetchDataLote] = useFetch<LoteResponse>();
  const [responseFornecedor, fetchDataFornecedor] = useFetch<FornecedorResponse>();
  const [responseProduto, fetchDataProduto] = useFetch<ProdutoResponse>();
  const [responseAddEntradaSaida, fetchDataAddEntradaSaida] = useFetch<EntradaSaidaResponse>();

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

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isEntrada, setIsEntrada] = useState(true);

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };

    const urlEntrada = `${api.url}/entrada?empresa=${dataLogin.empresa}`;
    fetchDataEntrada(urlEntrada, { headers: headers, method: 'GET' });

    const urlSaida = `${api.url}/saida?empresa=${dataLogin.empresa}`;
    fetchDataSaida(urlSaida, { headers: headers, method: 'GET' });
  }, [responseAddEntradaSaida, dataLogin]);

  useEffect(() => {
    if (Array.isArray(responseEntrada.data)) {
      setDataEntrada(responseEntrada.data);
    }
  }, [responseEntrada.data]);

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

  const handleAdd = (entrada: boolean) => {
    setAdicionarEntradaSaida({
      quantidade: 0,
      lote: 0,
      fornecedor: 0,
      produto: 0
    });
    setAddModalOpen(true);
    setIsEntrada(entrada);
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataLote(`${api.url}/lote?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
    fetchDataFornecedor(`${api.url}/fornecedor?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
    fetchDataProduto(`${api.url}/produto?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
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
      fetchDataAddEntradaSaida(url, { body, headers, method: 'POST' });
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

  useEffect(() => {
    const allData = [...dataEntrada, ...dataSaida];
    const filtered = allData.filter((item) => item.descricao.toLowerCase().includes(search));
    if (filtered.length < 10) {
      setFilteredData(filtered);
      return;
    }
    setTotalPages(Math.ceil(filtered.length / 10));
    setPage(1);
    setFilteredData(filtered.slice(0, 10));
  }, [search, dataEntrada, dataSaida]);

  const handleNextPage = () => {
    if (page >= totalPages) return;
    const allData = [...dataEntrada, ...dataSaida];
    const start = page * 10;
    const end = start + 10;
    if (search) {
      const filtered = allData.filter((item) => item.descricao.toLowerCase().includes(search));
      setFilteredData(filtered.slice(start, end));
    } else {
      setFilteredData(allData.slice(start, end));
    }
    setPage(page + 1);
  };

  const handleBeforePage = () => {
    if (page <= 1) return;
    const allData = [...dataEntrada, ...dataSaida];
    const start = (page - 2) * 10;
    const end = start + 10;
    if (search) {
      const filtered = allData.filter((item) => item.descricao.toLowerCase().includes(search));
      setFilteredData(filtered.slice(start, end));
    } else {
      setFilteredData(allData.slice(start, end));
    }
    setPage(page - 1);
  };

  const handleEdit = (item: any) => {
  };

  const handleDelete = (item: any) => {
  };

  return dataEntrada.length > 0 || dataSaida.length > 0 ? (
    <Content.Root>
      <Content.Header title='Cadastro de Entrada' text='' onClickToAdd={() => handleAdd(true)} />
      <Content.Header title='Cadastro de Saída' text='' onClickToAdd={() => handleAdd(false)} />
      <Content.Search handleSearch={handleSearch} search={search} />
      <Content.Table
        data={[...dataEntrada, ...dataSaida]}
        filteredData={filteredData}
        handleBeforePage={handleBeforePage}
        handleNextPage={handleNextPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        page={page}
        col={['descricao', 'quantidade', 'lote', 'fornecedor', 'produto', 'tipo']}
      />
      <Content.Delete
        text='Deseja deletar esse registro?'
        setDeleteModalOpen={setAddModalOpen}
        deleteModalOpen={addModalOpen}
        selectedItem={null}
        onConfirmDeleteItem={() => {}}
        title='Deletar Registro'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title={`Adicionar ${isEntrada ? 'Entrada' : 'Saída'}`} setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='quantidade' type='number' arialabel='Quantidade' placeholder='Quantidade' onChangeAction={handleChange} value={adicionarEntradaSaida.quantidade.toString()}>
              {error.quantidade && <Forms.Small id="quantidade" text={error.quantidade} />}
            </Forms.Input>
            <Forms.Select id='lote' data={lotes} onValueChange={(e) => handleSelectChange(e, 'lote')} value={adicionarEntradaSaida.lote} />
            {error.lote && <Forms.Small id="lote" text={error.lote} />}
            <Forms.Select id='fornecedor' data={fornecedores} onValueChange={(e) => handleSelectChange(e, 'fornecedor')} value={adicionarEntradaSaida.fornecedor} />
            {error.fornecedor && <Forms.Small id="fornecedor" text={error.fornecedor} />}
            <Forms.Select id='produto' data={produtos} onValueChange={(e) => handleSelectChange(e, 'produto')} value={adicionarEntradaSaida.produto} />
            {error.produto && <Forms.Small id="produto" text={error.produto} />}
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddEntradaSaida} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}
