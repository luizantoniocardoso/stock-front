import { Content, Forms, Modal } from '@/Components';
import { api } from '@/Enviroments';
import { useAlert, useAuth, useFetch } from '@/Hooks';
import { CargoResponse, Produto, ProdutoResponse, User, ListUserResponse } from '@/Interfaces/Api';
import { ChangeEvent, useEffect, useState } from 'react';

import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';
import { adicionarProdutoSchema, AdicionarProdutoSchema } from '@/Schemas';

export function CadastroProduto() {
  const [data, setData] = useState<Produto[]>([]);
  const [filteredData, setFilteredData] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { dataLogin, user } = useAuth();
  const alert = useAlert();

  const [responseProduto, fetchDataEstoque] = useFetch<ProdutoResponse>();
  const [responseCategoria, fetchDataCategoria] = useFetch<CargoResponse>();
  const [responseAddProduto, fetchDataAddProduto] = useFetch<ListUserResponse>();
  const [responseEditEstoque, fetchDataEditEstoque] = useFetch<ListUserResponse>();
  const [responseDeleteEstoque, fetchDataDeleteEstoque] = useFetch<ListUserResponse>();

  const [categoria, setCategoria] = useState<SelectData[]>([{ value: 0, text: '' }]);
  
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState<AdicionarProdutoSchema>({
    descricao: '',
    custo: 0,
    preco: 0,
    quantidadeMinima: 0,
    quantidadeMaxima: 0,
    validade: '',
    categoria: 0
  });

  const [adicionarProduto, setAdicionarProduto] = useState<AdicionarProdutoSchema>({
    categoria: 0,
    custo: 0,
    descricao: '',
    preco: 0,
    quantidadeMaxima: 0,
    quantidadeMinima: 0,
    validade: ''
  });

  const [error, setError] = useState({
    descricao: '',
    custo: '',
    preco: '',
    quantidadeMinima: '',
    quantidadeMaxima: '',
    validade: '',
    categoria: ''
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const permission = user?.cargo?.nivel === 'ADMIN' ? true : false;

  useEffect(() => {
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/produto?empresa=${dataLogin.empresa}`;
    fetchDataEstoque(url, { headers: headers, method: 'GET' });
  }, [responseAddProduto, dataLogin, responseDeleteEstoque, responseEditEstoque]);

  useEffect(() => {
    if (!responseProduto || !responseProduto.data?.products) return;
    responseProduto.data.products.map((item) => {
      if (!item.categoria) return;
      (item.categoria as any) = item.categoria.descricao;
    });
    setData(responseProduto.data?.products || []);
    setFilteredData(responseProduto.data?.products.slice(0, 10) || []);
    setTotalPages(Math.ceil(responseProduto.data?.products?.length ? responseProduto.data.products.length / 10 : 1));
  }, [responseProduto.data, responseProduto, setData, responseAddProduto]);

  const handleAdd = () => {
    setAdicionarProduto({
      categoria: 0,
      custo: 0,
      descricao: '',
      preco: 0,
      quantidadeMaxima: 0,
      quantidadeMinima: 0,
      validade: ''
    });
    setAddModalOpen(true);
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataCategoria(`${api.url}/categoria?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdicionarProduto((prevData) => ({
      ...prevData,
      [id]: id === 'custo' || id === 'preco' || id === 'quantidadeMinima' || id === 'quantidadeMaxima' ? Number(value) : value
    }));
  };

  const handleSelectChange = (e: SelectData) => {
    setAdicionarProduto((prevData) => ({ ...prevData, categoria: e.value }));
  };

  const onConfirmAddProduto = () => {
    const adicionarProdutoSchemaValidator = adicionarProdutoSchema.safeParse(adicionarProduto);
    if (!adicionarProdutoSchemaValidator.success) {
      setError({
        descricao: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'descricao')?.message || '',
        custo: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'custo')?.message || '',
        preco: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'preco')?.message || '',
        quantidadeMinima: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'quantidadeMinima')?.message || '',
        quantidadeMaxima: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'quantidadeMaxima')?.message || '',
        validade: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'validade')?.message || '',
        categoria: adicionarProdutoSchemaValidator.error.errors.find((error) => error.path[0] === 'categoria')?.message || ''
      });
    } else {
      setAddModalOpen(false);
      const url = `${api.url}/produto?empresa=${dataLogin?.empresa}`;
      const body = JSON.stringify(adicionarProduto);
      const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
      fetchDataAddProduto(url, { body, headers, method: 'POST' });
      alert.openAlert({ text: 'Produto Adicionado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
    }
  };

  const handleDelete = (produto: Produto) => {
    setSelectedProduto(produto);
    setDeleteModalOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    if (!dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    fetchDataCategoria(`${api.url}/categoria?empresa=${dataLogin?.empresa}`, { method: 'GET', headers: headers });
    setFormData({
      descricao: produto.descricao,
      custo: produto.custo,
      preco: produto.preco,
      quantidadeMinima: produto.quantidadeMinima,
      quantidadeMaxima: produto.quantidadeMaxima,
      validade: produto.validade,
      categoria: produto.categoria.id
    });
    setEditModalOpen(true);
  };

  const onConfirmEditProduto = () => {
    setEditModalOpen(false);
    if (!selectedProduto || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/produto/${selectedProduto.id}?empresa=${dataLogin.empresa}`;
    const body = JSON.stringify(formData);
    fetchDataEditEstoque(url, { body, headers, method: 'PUT' });
    alert.openAlert({ text: 'Produto Editado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  const onConfirmDeleteProduto = () => {
    setDeleteModalOpen(false);
    if (!selectedProduto || !dataLogin) return;
    const headers = { Authorization: `Bearer ${dataLogin?.token}`, 'Content-Type': 'application/json' };
    const url = `${api.url}/produto/${selectedProduto.id}?empresa=${dataLogin.empresa}`;
    fetchDataDeleteEstoque(url, { headers: headers, method: 'DELETE' });
    alert.openAlert({ text: 'Produto Deletado', type: 'success', time: 3000, title: 'Sucesso', onCloseAlert: () => {} });
  };

  useEffect(() => {
    if (!responseCategoria) return;
    const data = responseCategoria.data?.categories || [];
    const dataFormated = data.map((item) => ({ value: item.id, text: item.descricao }));
    setCategoria(dataFormated);
  }, [responseCategoria.data, responseCategoria]);

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
      <Content.Header title='Cadastro de Produto' text='' onClickToAdd={handleAdd} permission={permission}/>
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
        title='produtos'
      />
      <Content.Delete
        text='Deseja deletar esse produto?'
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedItem={selectedProduto}
        onConfirmDeleteItem={onConfirmDeleteProduto}
        title='Deletar Produto'
      />

      <Modal.Root setShowModal={setAddModalOpen} showModal={addModalOpen}>
        <Modal.Header title='Adicionar Produto' setShowModal={() => setAddModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={handleChange} value={adicionarProduto.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
            <Forms.Input id='custo' type='text' arialabel='Custo' placeholder='Custo' onChangeAction={handleChange} value={adicionarProduto.custo.toString()}>
              {error.custo && <Forms.Small id="custo" text={error.custo} />}
            </Forms.Input>
            <Forms.Input id='preco' type='text' arialabel='Preço' placeholder='Preço' onChangeAction={handleChange} value={adicionarProduto.preco.toString()}>
              {error.preco && <Forms.Small id="preco" text={error.preco} />}
            </Forms.Input>
            <Forms.Input id='quantidadeMinima' type='text' arialabel='Quantidade Minima' placeholder='Quantidade Minima' onChangeAction={handleChange} value={adicionarProduto.quantidadeMinima.toString()}>
              {error.quantidadeMinima && <Forms.Small id="quantidadeMinima" text={error.quantidadeMinima} />}
            </Forms.Input>
            <Forms.Input id='quantidadeMaxima' type='text' arialabel='Quantidade Maxima' placeholder='Quantidade Maxima' onChangeAction={handleChange} value={adicionarProduto.quantidadeMaxima.toString()}>
              {error.quantidadeMaxima && <Forms.Small id="quantidadeMaxima" text={error.quantidadeMaxima} />}
            </Forms.Input>
            <Forms.Input id='validade' type='date' arialabel='Validade' placeholder='Validade' onChangeAction={handleChange} value={adicionarProduto.validade}>
              {error.validade && <Forms.Small id="validade" text={error.validade} />}
            </Forms.Input>
            <Forms.Select data={categoria} onValueChange={handleSelectChange} value={adicionarProduto.categoria} />
            {error.categoria && <Forms.Small id="categoria" text={error.categoria} />}
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setAddModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmAddProduto} type='success'>Adicionar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>

      <Modal.Root setShowModal={setEditModalOpen} showModal={editModalOpen}>
        <Modal.Header title='Editar Produto' setShowModal={() => setEditModalOpen(false)} />
        <Modal.Body>
          <Forms.Root>
            <Forms.Input id='descricao' type='text' arialabel='Descrição' placeholder='Descrição' onChangeAction={(e) => setFormData({ ...formData, descricao: e.target.value })} value={formData.descricao}>
              {error.descricao && <Forms.Small id="descricao" text={error.descricao} />}
            </Forms.Input>
            <Forms.Input id='custo' type='text' arialabel='Custo' placeholder='Custo' onChangeAction={(e) => setFormData({ ...formData, custo: Number(e.target.value) })} value={formData.custo.toString()}>
              {error.custo && <Forms.Small id="custo" text={error.custo} />}
            </Forms.Input>
            <Forms.Input id='preco' type='text' arialabel='Preço' placeholder='Preço' onChangeAction={(e) => setFormData({ ...formData, preco: Number(e.target.value) })} value={formData.preco.toString()}>
              {error.preco && <Forms.Small id="preco" text={error.preco} />}
            </Forms.Input>
            <Forms.Input id='quantidadeMinima' type='text' arialabel='Quantidade Minima' placeholder='Quantidade Minima' onChangeAction={(e) => setFormData({ ...formData, quantidadeMinima: Number(e.target.value) })} value={formData.quantidadeMinima.toString()}>
              {error.quantidadeMinima && <Forms.Small id="quantidadeMinima" text={error.quantidadeMinima} />}
            </Forms.Input>
            <Forms.Input id='quantidadeMaxima' type='text' arialabel='Quantidade Maxima' placeholder='Quantidade Maxima' onChangeAction={(e) => setFormData({ ...formData, quantidadeMaxima: Number(e.target.value) })} value={formData.quantidadeMaxima.toString()}>
              {error.quantidadeMaxima && <Forms.Small id="quantidadeMaxima" text={error.quantidadeMaxima} />}
            </Forms.Input>
            <Forms.Input id='validade' type='date' arialabel='Validade' placeholder='Validade' onChangeAction={(e) => setFormData({ ...formData, validade: e.target.value })} value={formData.validade}>
              {error.validade && <Forms.Small id="validade" text={error.validade} />}
            </Forms.Input>
            <Forms.Select data={categoria} onValueChange={(e) => setFormData({ ...formData, categoria: e.value })} value={formData.categoria} />
            {error.categoria && <Forms.Small id="categoria" text={error.categoria} />}
          </Forms.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button onClickFunction={() => setEditModalOpen(false)} type='danger'>Fechar</Modal.Button>
          <Modal.Button onClickFunction={onConfirmEditProduto} type='success'>Aceitar</Modal.Button>
        </Modal.Footer>
      </Modal.Root>
    </Content.Root>
  ) : null;
}
