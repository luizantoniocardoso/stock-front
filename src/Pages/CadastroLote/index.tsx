import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { LoteResponse, Lote, ProdutoResponse, ListUserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarLoteSchema, AdicionarLoteSchema } from '@/Schemas';

export function CadastroLote() {
  const [data, setData] = useState<Lote[]>([]);
  const [filteredData, setFilteredData] = useState<Lote[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin, user } = useAuth();
  const alert = useAlert();

  const [responseLote, fetchDataLote] = useFetch<LoteResponse>();
  const [responseProduto, fetchDataProduto] = useFetch<ProdutoResponse>();
  const [responseAddLote, fetchDataAddLote] = useFetch<ListUserResponse>();
  const [responseEditLote, fetchDataEditLote] = useFetch<ListUserResponse>();
  const [responseDeleteLote, fetchDataDeleteLote] = useFetch<ListUserResponse>();

  const [produtos, setProdutos] = useState<SelectData[]>([{ value: 0, text: '' }]);

  const [selectedLote, setSelectedLote] = useState<Lote | null>(null);
  const [formData, setFormData] = useState<AdicionarLoteSchema>({
    codigoBarras: '',
    quantidade: 0,
    dataFabricacao: '',
    dataVencimento: '',
    observacoes: '',
    produto: 0
  });

  const [adicionarLote, setAdicionarLote] = useState<AdicionarLoteSchema>({
    codigoBarras: '',
    quantidade: 0,
    dataFabricacao: '',
    dataVencimento: '',
    observacoes: '',
    produto: 0
  });

  const [error, setError] = useState({
    codigoBarras: '',
    quantidade: '',
    dataFabricacao: '',
    dataVencimento: '',
    observacoes: '',
    produto: ''
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const permission = user?.cargo?.nivel === 'ADMIN' ? true : false;


  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/lote?empresa=${dataLogin.empresa}`;
    fetchDataLote(url, { headers: headers, method: 'GET' });
  }, [responseAddLote, dataLogin, responseDeleteLote, responseEditLote]);

  useEffect(() => {
    if (!responseLote || !responseLote.data?.lotes) return;
    setData(responseLote.data?.lotes || []);
    setFilteredData(responseLote.data?.lotes.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseLote.data?.lotes?.length ? responseLote.data.lotes.length / 10 : 1));
  }, [responseLote.data, responseLote, setData, responseAddLote]);

  const handleAdd = () => {
    setAdicionarLote({
      codigoBarras: '',
      quantidade: 0,
      dataFabricacao: '',
      dataVencimento: '',
      observacoes: '',
      produto: 0
    });
    setAddModalOpen(true);
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataProduto(`${api.url}/produto?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarLote((prevData) => ({
      ...prevData,
      [id]: id === 'quantidade' || id === 'produto' ? Number(value) : value
    }));
  };

  const handleSelectChange = (e: SelectData) => {
    setAdicionarLote((prevData) => ({ ...prevData, produto: e.value }));
  };

  const onConfirmAddLote = () => {
    const adicionarLoteSchemaValidator = adicionarLoteSchema.safeParse(adicionarLote);
    if (!adicionarLoteSchemaValidator.success) {
      setError({
        codigoBarras: adicionarLoteSchemaValidator.error.errors.find((error) => error.path[0] === 'codigoBarras')?.message || '',
        quantidade: adicionarLoteSchemaValidator.error.errors.find((error) => error.path[0] === 'quantidade')?.message || '',
        dataFabricacao: adicionarLoteSchemaValidator.error.errors.find((error) => error.path[0] === 'dataFabricacao')?.message || '',
        dataVencimento: adicionarLoteSchemaValidator.error.errors.find((error) => error.path[0] === 'dataVencimento')?.message || '',
        observacoes: adicionarLoteSchemaValidator.error.errors.find((error) => error.path[0] === 'observacoes')?.message || '',
        produto: adicionarLoteSchemaValidator.error.errors.find((error) => error.path[0] === 'produto')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/lote?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarLote);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddLote(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Lote Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  const handleDelete = (lote: Lote) => {
    setSelectedLote(lote);
    setDeleteModalOpen(true);
  };

  const handleEdit = (lote: Lote) => {
    setSelectedLote(lote);
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataProduto(`${api.url}/produto?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
    setFormData({
      codigoBarras: lote.codigoBarras,
      quantidade: lote.quantidade,
      dataFabricacao: lote.dataFabricacao,
      dataVencimento: lote.dataVencimento,
      observacoes: lote.observacoes,
      produto: lote.produto.id
    });
    setEditModalOpen(true);
  };

  const onConfirmEditLote = () => {
    setEditModalOpen(false);
    if (!selectedLote || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/lote/${selectedLote.id}?empresa=${dataLogin.empresa}`;
    const body = JSON.stringify(formData);
    fetchDataEditLote(url, { body, headers, method: 'PUT' });
    alert.openAlert({ text: 'Lote Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const onConfirmDeleteLote = () => {
    setDeleteModalOpen(false);
    if (!selectedLote || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/lote/${selectedLote.id}?empresa=${dataLogin.empresa}`;
    fetchDataDeleteLote(url, { headers: headers, method: 'DELETE' });
    alert.openAlert({ text: 'Lote Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  useEffect(() => {
    if (!responseProduto) return;
    const data = responseProduto.data?.products || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao }));
    setProdutos(dataFormated);
  }, [responseProduto.data, responseProduto]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase().trim());

  useEffect(() => {
    const filtered = data.filter((item) => item.codigoBarras.toLowerCase().includes(search));
    if (filtered.length < 10) return setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setPage(1);
    setFilteredData(filtered ? filtered.slice(0, 10) : []);
  }, [search]);

  const handleNextPage = () => {
    if (page >= totalPages) return;
    if (search) {
      const filtered = data.filter((item) => item.codigoBarras.toLowerCase().includes(search));
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
      const filtered = data.filter((item) => item.codigoBarras.toLowerCase().includes(search));
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
  };

  return data?.length > 0 ? (
    <Content.Root>
      <Content.Header title='Cadastro de Lote' text='' onClickToAdd={handleAdd} permission={permission} />
      <Content.Search handleSearch={handleSearch} search={search} />
      <Content.Table
        permission={permission}
        data={data}
        filteredData={filteredData}
        handleBeforePage={handleBeforePage}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleNextPage={handleNextPage}
        page={page}
        col={Object.keys(data[0]) as string[]}
        title='lotes'
      />
      <Content.Delete
        text='Deseja deletar esse lote?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedLote}
        onConfirmDeleteItem={onConfirmDeleteLote}
        title='Deletar Lote'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title='Adicionar Lote' setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='codigoBarras' type='text' arialabel='Código de Barras' placeholder='Código de Barras' onChangeAction={handleChange} value={adicionarLote.codigoBarras}>
              {error.codigoBarras && <Forms.Small id="codigoBarras" text={error.codigoBarras} />}
            </Forms.Input>
            <Forms.Input id='quantidade' type='number' arialabel='Quantidade' placeholder='Quantidade' onChangeAction={handleChange} value={adicionarLote.quantidade.toString()}>
              {error.quantidade && <Forms.Small id="quantidade" text={error.quantidade} />}
            </Forms.Input>
            <Forms.Input id='dataFabricacao' type='date' arialabel='Data de Fabricação' placeholder='Data de Fabricação' onChangeAction={handleChange} value={adicionarLote.dataFabricacao}>
              {error.dataFabricacao && <Forms.Small id="dataFabricacao" text={error.dataFabricacao} />}
            </Forms.Input>
            <Forms.Input id='dataVencimento' type='date' arialabel='Data de Vencimento' placeholder='Data de Vencimento' onChangeAction={handleChange} value={adicionarLote.dataVencimento}>
              {error.dataVencimento && <Forms.Small id="dataVencimento" text={error.dataVencimento} />}
            </Forms.Input>
            <Forms.Input id='observacoes' type='text' arialabel='Observações' placeholder='Observações' onChangeAction={handleChange} value={adicionarLote.observacoes}>
              {error.observacoes && <Forms.Small id="observacoes" text={error.observacoes} />}
            </Forms.Input>
            <Forms.Select data={produtos} onValueChange={handleSelectChange} value={adicionarLote.produto} />
            {error.produto && <Forms.Small id="produto" text={error.produto} />}
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddLote} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>

      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen}>
        <Modal.Header title='Editar Lote' setShowModal={() => setEditModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='codigoBarras' type='text' arialabel='Código de Barras' placeholder='Código de Barras' onChangeAction={(e) => setFormData({ ...formData, codigoBarras: e.target.value })} value={formData.codigoBarras}>
              {error.codigoBarras && <Forms.Small id="codigoBarras" text={error.codigoBarras} />}
            </Forms.Input>
            <Forms.Input id='quantidade' type='number' arialabel='Quantidade' placeholder='Quantidade' onChangeAction={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })} value={formData.quantidade.toString()}>
              {error.quantidade && <Forms.Small id="quantidade" text={error.quantidade} />}
            </Forms.Input>
            <Forms.Input id='dataFabricacao' type='date' arialabel='Data de Fabricação' placeholder='Data de Fabricação' onChangeAction={(e) => setFormData({ ...formData, dataFabricacao: e.target.value })} value={formData.dataFabricacao}>
              {error.dataFabricacao && <Forms.Small id="dataFabricacao" text={error.dataFabricacao} />}
            </Forms.Input>
            <Forms.Input id='dataVencimento' type='date' arialabel='Data de Vencimento' placeholder='Data de Vencimento' onChangeAction={(e) => setFormData({ ...formData, dataVencimento: e.target.value })} value={formData.dataVencimento}>
              {error.dataVencimento && <Forms.Small id="dataVencimento" text={error.dataVencimento} />}
            </Forms.Input>
            <Forms.Input id='observacoes' type='text' arialabel='Observações' placeholder='Observações' onChangeAction={(e) => setFormData({ ...formData, observacoes: e.target.value })} value={formData.observacoes}>
              {error.observacoes && <Forms.Small id="observacoes" text={error.observacoes} />}
            </Forms.Input>
            <Forms.Select data={produtos} onValueChange={(e) => setFormData({ ...formData, produto: e.value })} value={formData.produto} />
            {error.produto && <Forms.Small id="produto" text={error.produto} />}
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmEditLote} type='success'>Aceitar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}
