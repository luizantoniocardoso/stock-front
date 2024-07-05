import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { Cargo, CargoResponse, ListUserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarCargoSchema, AdicionarCargoSchema } from '@/Schemas';

export function CadastroCargo() {
  const [data, setData] = useState<Cargo[]>([]);
  const [filteredData, setFilteredData] = useState<Cargo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin, user } = useAuth();
  const alert = useAlert();

  const [responseCargo, fetchDataCargo] = useFetch<CargoResponse>();
  const [responseAddCargo, fetchDataAddCargo] = useFetch<ListUserResponse>();
  const [responseEditCargo, fetchDataEditCargo] = useFetch<ListUserResponse>();
  const [responseDeleteCargo, fetchDataDeleteCargo] = useFetch<ListUserResponse>();

  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [formData, setFormData] = useState<AdicionarCargoSchema>({
    descricao: '',
    nivel: '',
    empresa: 1
  });

  const [adicionarCargo, setAdicionarCargo] = useState<AdicionarCargoSchema>({
    descricao: '',
    nivel: '',
    empresa: 1
  });

  const [error, setError] = useState({
    descricao: '',
    nivel: '',
    empresa: ''
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const permission = user?.cargo?.nivel === 'ADMIN' ? true : false;

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/cargo?empresa=${dataLogin.empresa}&skip=0`;
    fetchDataCargo(url, { headers: headers, method: 'GET' });
  }, [responseAddCargo, dataLogin, responseDeleteCargo, responseEditCargo]);

  useEffect(() => {
    if (!responseCargo || !responseCargo.data?.cargos) return;
    setData(responseCargo.data?.cargos || []);
    setFilteredData(responseCargo.data?.cargos.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseCargo.data?.cargos?.length ? responseCargo.data.cargos.length / 10 : 1));
  }, [responseCargo.data, responseCargo, setData, responseAddCargo]);

  const handleAdd = () => {
    setAdicionarCargo({
      descricao: '',
      nivel: '',
      empresa: dataLogin?.empresa || 1
    });
    setAddModalOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarCargo((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const onConfirmAddCargo = () => {
    const adicionarCargoSchemaValidator = adicionarCargoSchema.safeParse(adicionarCargo);
    if (!adicionarCargoSchemaValidator.success) {
      setError({
        descricao: adicionarCargoSchemaValidator.error.errors.find((error) => error.path[0] === 'descricao')?.message || '',
        nivel: adicionarCargoSchemaValidator.error.errors.find((error) => error.path[0] === 'nivel')?.message || '',
        empresa: adicionarCargoSchemaValidator.error.errors.find((error) => error.path[0] === 'empresa')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/cargo?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarCargo);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddCargo(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Cargo Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  const handleDelete = (cargo: Cargo) => {
    setSelectedCargo(cargo);
    setDeleteModalOpen(true);
  };

  const handleEdit = (cargo: Cargo) => {
    setSelectedCargo(cargo);
    setFormData({
      descricao: cargo.descricao,
      nivel: cargo.nivel,
      empresa: cargo.empresa
    });
    setEditModalOpen(true);
  };

  const onConfirmEditCargo = () => {
    setEditModalOpen(false);
    if (!selectedCargo || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/cargo/${selectedCargo.id}?empresa=${dataLogin.empresa}`;
    const body = JSON.stringify(formData);
    fetchDataEditCargo(url, { body, headers, method: 'PUT' });
    alert.openAlert({ text: 'Cargo Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const onConfirmDeleteCargo = () => {
    setDeleteModalOpen(false);
    if (!selectedCargo || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/cargo/${selectedCargo.id}?empresa=${dataLogin.empresa}`;
    fetchDataDeleteCargo(url, { headers: headers, method: 'DELETE' });
    alert.openAlert({ text: 'Cargo Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
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
      <Content.Header title='Cadastro de Cargo' text='' onClickToAdd={handleAdd} permission={permission}/>
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
        title='cargos'
      />
      <Content.Delete
        text='Deseja deletar esse cargo?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedCargo}
        onConfirmDeleteItem={onConfirmDeleteCargo}
        title='Deletar Cargo'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title='Adicionar Cargo' setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={handleChange} value={adicionarCargo.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
            <Forms.Input id='nivel' type='text' arialabel='Nível' placeholder='Nível' onChangeAction={handleChange} value={adicionarCargo.nivel}>
              {error.nivel && <Forms.Small id="nivel" text={error.nivel} />}
            </Forms.Input>
            <Forms.Input id='empresa' type='text' arialabel='Empresa' placeholder='Empresa' onChangeAction={handleChange} value={adicionarCargo.empresa.toString()}>
              {error.empresa && <Forms.Small id="empresa" text={error.empresa} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddCargo} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>

      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen}>
        <Modal.Header title='Editar Cargo' setShowModal={() => setEditModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={(e) => setFormData({ ...formData, descricao: e.target.value })} value={formData.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
            <Forms.Input id='nivel' type='text' arialabel='Nível' placeholder='Nível' onChangeAction={(e) => setFormData({ ...formData, nivel: e.target.value })} value={formData.nivel}>
              {error.nivel && <Forms.Small id="nivel" text={error.nivel} />}
            </Forms.Input>
            <Forms.Input id='empresa' type='text' arialabel='Empresa' placeholder='Empresa' onChangeAction={(e) => setFormData({ ...formData, empresa: Number(e.target.value) })} value={formData.empresa.toString()}>
              {error.empresa && <Forms.Small id="empresa" text={error.empresa} />}
            </Forms.Input>
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmEditCargo} type='success'>Aceitar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}