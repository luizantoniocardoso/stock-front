import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { FornecedorResponse, Fornecedor, UserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { adicionarFornecedorSchema, AdicionarFornecedorSchema } from '@/Schemas';

export function CadastroFornecedor() {
  const [data, setData] = useState<Fornecedor[]>([]);
  const [filteredData, setFilteredData] = useState<Fornecedor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin } = useAuth();
  const alert = useAlert();

  const [responseFornecedor, fetchDataFornecedor] = useFetch<FornecedorResponse>();
  const [responseAddFornecedor, fetchDataAddFornecedor] = useFetch<UserResponse>();
  const [responseEditFornecedor, fetchDataEditFornecedor] = useFetch<UserResponse>();
  const [responseDeleteFornecedor, fetchDataDeleteFornecedor] = useFetch<UserResponse>();

  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);
  const [formData, setFormData] = useState<AdicionarFornecedorSchema>({
    descricao: '',
    email: '',
    telefone: '',
    cnpj: '',
    logradouro: '',
    cidade: 0
  });

  const [adicionarFornecedor, setAdicionarFornecedor] = useState<AdicionarFornecedorSchema>({
    descricao: '',
    email: '',
    telefone: '',
    cnpj: '',
    logradouro: '',
    cidade: 0
  });

  const [error, setError] = useState({
    descricao: '',
    email: '',
    telefone: '',
    cnpj: '',
    logradouro: '',
    cidade: ''
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/fornecedor?empresa=${dataLogin.empresa}`;
    fetchDataFornecedor(url, { headers: headers, method: 'GET' });
  }, [responseAddFornecedor, dataLogin, responseDeleteFornecedor, responseEditFornecedor]);

  useEffect(() => {
    if (!responseFornecedor || !responseFornecedor.data?.fornecedores) return;
    setData(responseFornecedor.data?.fornecedores || []);
    setFilteredData(responseFornecedor.data?.fornecedores.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseFornecedor.data?.fornecedores?.length ? responseFornecedor.data.fornecedores.length / 10 : 1));
  }, [responseFornecedor.data, responseFornecedor, setData, responseAddFornecedor]);

  const handleAdd = () => {
    setAdicionarFornecedor({
      descricao: '',
      email: '',
      telefone: '',
      cnpj: '',
      logradouro: '',
      cidade: 0
    });
    setAddModalOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarFornecedor((prevData) => ({
      ...prevData,
      [id]: id === 'cidade' ? Number(value) : value
    }));
  };

  const onConfirmAddFornecedor = () => {
    const adicionarFornecedorSchemaValidator = adicionarFornecedorSchema.safeParse(adicionarFornecedor);
    if (!adicionarFornecedorSchemaValidator.success) {
      setError({
        descricao: adicionarFornecedorSchemaValidator.error.errors.find((error) => error.path[0] === 'descricao')?.message || '',
        email: adicionarFornecedorSchemaValidator.error.errors.find((error) => error.path[0] === 'email')?.message || '',
        telefone: adicionarFornecedorSchemaValidator.error.errors.find((error) => error.path[0] === 'telefone')?.message || '',
        cnpj: adicionarFornecedorSchemaValidator.error.errors.find((error) => error.path[0] === 'cnpj')?.message || '',
        logradouro: adicionarFornecedorSchemaValidator.error.errors.find((error) => error.path[0] === 'logradouro')?.message || '',
        cidade: adicionarFornecedorSchemaValidator.error.errors.find((error) => error.path[0] === 'cidade')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/fornecedor?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarFornecedor);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddFornecedor(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Fornecedor Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  const handleDelete = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setDeleteModalOpen(true);
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setFormData({
      descricao: fornecedor.descricao,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      cnpj: fornecedor.cnpj,
      logradouro: fornecedor.logradouro,
      cidade: fornecedor.cidade
    });
    setEditModalOpen(true);
  };

  const onConfirmEditFornecedor = () => {
    setEditModalOpen(false);
    if (!selectedFornecedor || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/fornecedor/${selectedFornecedor.id}?empresa=${dataLogin.empresa}`;
    const body = JSON.stringify(formData);
    fetchDataEditFornecedor(url, { body, headers, method: 'PUT' });
    alert.openAlert({ text: 'Fornecedor Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const onConfirmDeleteFornecedor = () => {
    setDeleteModalOpen(false);
    if (!selectedFornecedor || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/fornecedor/${selectedFornecedor.id}?empresa=${dataLogin.empresa}`;
    fetchDataDeleteFornecedor(url, { headers: headers, method: 'DELETE' });
    alert.openAlert({ text: 'Fornecedor Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase().trim());

  useEffect(() => {
    const filtered = data.filter((item) => item.descricao.toLowerCase().includes(search));
    if (filtered.length < 10) return setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setPage(1);
    setFilteredData(filtered ? filtered.slice(0, 10) : []);
  }, [search]);

  const handleNextPage = () => {
    if (page >= totalPages) return;
    if (search) {
      const filtered = data.filter((item) => item.descricao.toLowerCase().includes(search));
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
  };

  return data?.length > 0 ? (
    <Content.Root>
      <Content.Header title='Cadastro de Fornecedor' text='' onClickToAdd={handleAdd} />
      <Content.Search handleSearch={handleSearch} search={search} />
      <Content.Table
        data={data}
        filteredData={filteredData}
        handleBeforePage={handleBeforePage}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleNextPage={handleNextPage}
        page={page}
        col={Object.keys(data[0]) as string[]}
      />
      <Content.Delete
        text='Deseja deletar esse fornecedor?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedFornecedor}
        onConfirmDeleteItem={onConfirmDeleteFornecedor}
        title='Deletar Fornecedor'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title='Adicionar Fornecedor' setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={handleChange} value={adicionarFornecedor.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
            <Forms.Input id='email' type='text' arialabel='Email' placeholder='Email' onChangeAction={handleChange} value={adicionarFornecedor.email}>
              {error.email && <Forms.Small id="email" text={error.email} />}
            </Forms.Input>
            <Forms.Input id='telefone' type='text' arialabel='Telefone' placeholder='Telefone' onChangeAction={handleChange} value={adicionarFornecedor.telefone}>
              {error.telefone && <Forms.Small id="telefone" text={error.telefone} />}
            </Forms.Input>
            <Forms.Input id='cnpj' type='text' arialabel='CNPJ' placeholder='CNPJ' onChangeAction={handleChange} value={adicionarFornecedor.cnpj}>
              {error.cnpj && <Forms.Small id="cnpj" text={error.cnpj} />}
            </Forms.Input>
            <Forms.Input id='logradouro' type='text' arialabel='Logradouro' placeholder='Logradouro' onChangeAction={handleChange} value={adicionarFornecedor.logradouro}>
              {error.logradouro && <Forms.Small id="logradouro" text={error.logradouro} />}
            </Forms.Input>
            <Forms.Input id='cidade' type='text' arialabel='Cidade' placeholder='Cidade' onChangeAction={handleChange} value={adicionarFornecedor.cidade.toString()}>
              {error.cidade && <Forms.Small id="cidade" text={error.cidade} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddFornecedor} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>

      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen}>
        <Modal.Header title='Editar Fornecedor' setShowModal={() => setEditModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={(e) => setFormData({ ...formData, descricao: e.target.value })} value={formData.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
            <Forms.Input id='email' type='text' arialabel='Email' placeholder='Email' onChangeAction={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email}>
              {error.email && <Forms.Small id="email" text={error.email} />}
            </Forms.Input>
            <Forms.Input id='telefone' type='text' arialabel='Telefone' placeholder='Telefone' onChangeAction={(e) => setFormData({ ...formData, telefone: e.target.value })} value={formData.telefone}>
              {error.telefone && <Forms.Small id="telefone" text={error.telefone} />}
            </Forms.Input>
            <Forms.Input id='cnpj' type='text' arialabel='CNPJ' placeholder='CNPJ' onChangeAction={(e) => setFormData({ ...formData, cnpj: e.target.value })} value={formData.cnpj}>
              {error.cnpj && <Forms.Small id="cnpj" text={error.cnpj} />}
            </Forms.Input>
            <Forms.Input id='logradouro' type='text' arialabel='Logradouro' placeholder='Logradouro' onChangeAction={(e) => setFormData({ ...formData, logradouro: e.target.value })} value={formData.logradouro}>
              {error.logradouro && <Forms.Small id="logradouro" text={error.logradouro} />}
            </Forms.Input>
            <Forms.Input id='cidade' type='text' arialabel='Cidade' placeholder='Cidade' onChangeAction={(e) => setFormData({ ...formData, cidade: Number(e.target.value) })} value={formData.cidade.toString()}>
              {error.cidade && <Forms.Small id="cidade" text={error.cidade} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmEditFornecedor} type='success'>Aceitar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}
