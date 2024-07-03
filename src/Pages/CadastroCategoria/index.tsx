import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { CategoriaResponse, Categoria, ListUserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { adicionarCategoriaSchema, AdicionarCategoriaSchema } from '@/Schemas';

export function CadastroCategoria() {
  const [data, setData] = useState<Categoria[]>([]);
  const [filteredData, setFilteredData] = useState<Categoria[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin, user } = useAuth();
  const alert = useAlert();

  const [responseCategoria, fetchDataCategoria] = useFetch<CategoriaResponse>();
  const [responseAddCategoria, fetchDataAddCategoria] = useFetch<ListUserResponse>();
  const [responseEditCategoria, fetchDataEditCategoria] = useFetch<ListUserResponse>();
  const [responseDeleteCategoria, fetchDataDeleteCategoria] = useFetch<ListUserResponse>();

  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [formData, setFormData] = useState<AdicionarCategoriaSchema>({
    descricao: ''
  });

  const [adicionarCategoria, setAdicionarCategoria] = useState<AdicionarCategoriaSchema>({
    descricao: ''
  });

  const [error, setError] = useState({
    descricao: ''
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const permission = user?.cargo?.nivel === 'ADMIN' ? true : false;


  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/categoria?empresa=${dataLogin.empresa}`;
    fetchDataCategoria(url, { headers: headers, method: 'GET' });
  }, [responseAddCategoria, dataLogin, responseDeleteCategoria, responseEditCategoria]);

  useEffect(() => {
    if (!responseCategoria || !responseCategoria.data?.categories) return;
    setData(responseCategoria.data?.categories || []);
    setFilteredData(responseCategoria.data?.categories.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseCategoria.data?.categories?.length ? responseCategoria.data.categories.length / 10 : 1));
  }, [responseCategoria.data, responseCategoria, setData, responseAddCategoria]);

  const handleAdd = () => {
    setAdicionarCategoria({
      descricao: ''
    });
    setAddModalOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdicionarCategoria((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const onConfirmAddCategoria = () => {
    const adicionarCategoriaSchemaValidator = adicionarCategoriaSchema.safeParse(adicionarCategoria);
    if (!adicionarCategoriaSchemaValidator.success) {
      setError({
        descricao: adicionarCategoriaSchemaValidator.error.errors.find((error) => error.path[0] === 'descricao')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/categoria?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarCategoria);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddCategoria(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Categoria Adicionada', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  const handleDelete = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setDeleteModalOpen(true);
  };

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setFormData({
      descricao: categoria.descricao
    });
    setEditModalOpen(true);
  };

  const onConfirmEditCategoria = () => {
    setEditModalOpen(false);
    if (!selectedCategoria || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/categoria/${selectedCategoria.id}?empresa=${dataLogin.empresa}`;
    const body = JSON.stringify(formData);
    fetchDataEditCategoria(url, { body, headers, method: 'PUT' });
    alert.openAlert({ text: 'Categoria Editada', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const onConfirmDeleteCategoria = () => {
    setDeleteModalOpen(false);
    if (!selectedCategoria || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/categoria/${selectedCategoria.id}?empresa=${dataLogin.empresa}`;
    fetchDataDeleteCategoria(url, { headers: headers, method: 'DELETE' });
    alert.openAlert({ text: 'Categoria Deletada', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
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
      <Content.Header title='Cadastro de Categoria' text='' onClickToAdd={handleAdd} permission={permission}/>
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
        title='categorias'
      />
      <Content.Delete
        text='Deseja deletar essa categoria?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedCategoria}
        onConfirmDeleteItem={onConfirmDeleteCategoria}
        title='Deletar Categoria'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title='Adicionar Categoria' setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={handleChange} value={adicionarCategoria.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddCategoria} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>

      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen}>
        <Modal.Header title='Editar Categoria' setShowModal={() => setEditModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={(e) => setFormData({ ...formData, descricao: e.target.value })} value={formData.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmEditCategoria} type='success'>Aceitar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}
