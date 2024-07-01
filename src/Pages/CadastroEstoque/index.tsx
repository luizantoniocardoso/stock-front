import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { EstoqueResponse, Estoque, UserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { adicionarEstoqueSchema, AdicionarEstoqueSchema } from '@/Schemas';

export function CadastroEstoque() {
  const [data, setData] = useState<Estoque[]>([]);
  const [filteredData, setFilteredData] = useState<Estoque[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin } = useAuth();
  const alert = useAlert();

  const [responseEstoque, fetchDataEstoque] = useFetch<EstoqueResponse>();
  const [responseAddEstoque, fetchDataAddEstoque] = useFetch<UserResponse>();
  const [responseEditEstoque, fetchDataEditEstoque] = useFetch<UserResponse>();
  const [responseDeleteEstoque, fetchDataDeleteEstoque] = useFetch<UserResponse>();

  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [formData, setFormData] = useState<AdicionarEstoqueSchema>({
    descricao: '',
    empresa: dataLogin?.empresa || 0
  });

  const [adicionarEstoque, setAdicionarEstoque] = useState<AdicionarEstoqueSchema>({
    descricao: '',
    empresa: dataLogin?.empresa || 0
  });

  const [error, setError] = useState({
    descricao: '',
    empresa: ''
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/estoque?empresa=${dataLogin.empresa}`;
    fetchDataEstoque(url, { headers: headers, method: 'GET' });
  }, [responseAddEstoque, dataLogin, responseDeleteEstoque, responseEditEstoque]);

  useEffect(() => {
    if (!responseEstoque || !responseEstoque.data?.estoques) return;
    setData(responseEstoque.data?.estoques || []);
    setFilteredData(responseEstoque.data?.estoques.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseEstoque.data?.estoques?.length ? responseEstoque.data.estoques.length / 10 : 1));
  }, [responseEstoque.data, responseEstoque, setData, responseAddEstoque]);

  const handleAdd = () => {
    setAdicionarEstoque({
      descricao: '',
      empresa: dataLogin?.empresa || 0
    });
    setAddModalOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarEstoque((prevData) => ({
      ...prevData,
      [id]: id === 'empresa' ? Number(value) : value
    }));
  };

  const onConfirmAddEstoque = () => {
    const adicionarEstoqueSchemaValidator = adicionarEstoqueSchema.safeParse(adicionarEstoque);
    if (!adicionarEstoqueSchemaValidator.success) {
      setError({
        descricao: adicionarEstoqueSchemaValidator.error.errors.find((error) => error.path[0] === 'descricao')?.message || '',
        empresa: adicionarEstoqueSchemaValidator.error.errors.find((error) => error.path[0] === 'empresa')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/estoque?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarEstoque);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddEstoque(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Estoque Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  const handleDelete = (estoque: Estoque) => {
    setSelectedEstoque(estoque);
    setDeleteModalOpen(true);
  };

  const handleEdit = (estoque: Estoque) => {
    setSelectedEstoque(estoque);
    setFormData({
      descricao: estoque.descricao,
      empresa: estoque.empresa
    });
    setEditModalOpen(true);
  };

  const onConfirmEditEstoque = () => {
    setEditModalOpen(false);
    if (!selectedEstoque || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/estoque/${selectedEstoque.id}?empresa=${dataLogin.empresa}`;
    const body = JSON.stringify(formData);
    fetchDataEditEstoque(url, { body, headers, method: 'PUT' });
    alert.openAlert({ text: 'Estoque Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const onConfirmDeleteEstoque = () => {
    setDeleteModalOpen(false);
    if (!selectedEstoque || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/estoque/${selectedEstoque.id}?empresa=${dataLogin.empresa}`;
    fetchDataDeleteEstoque(url, { headers: headers, method: 'DELETE' });
    alert.openAlert({ text: 'Estoque Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
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
      <Content.Header title='Cadastro de Estoque' text='' onClickToAdd={handleAdd} />
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
        text='Deseja deletar esse estoque?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedEstoque}
        onConfirmDeleteItem={onConfirmDeleteEstoque}
        title='Deletar Estoque'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title='Adicionar Estoque' setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={handleChange} value={adicionarEstoque.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddEstoque} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>

      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen}>
        <Modal.Header title='Editar Estoque' setShowModal={() => setEditModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={(e) => setFormData({ ...formData, descricao: e.target.value })} value={formData.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmEditEstoque} type='success'>Aceitar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}
