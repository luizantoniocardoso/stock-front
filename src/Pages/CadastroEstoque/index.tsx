import { Table } from '@/Components';
import { api } from '@/Enviroments';
import { useAuth, useFetch } from '@/Hooks';
import { useEffect, useState } from 'react';


interface Estoque {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
}

export function CadastroEstoque() {
  const [data, setData] = useState<Estoque[]>([]);
  const { dataLogin } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, fetchData] = useFetch<any>();

  useEffect(() => {
    if (!dataLogin) return;
    const headers ={
      Authorization: `Bearer ${dataLogin.token}`
      
    }
    const url = `${api.url}/produto?empresa=${dataLogin.empresa}`

    fetchData(url, { headers: headers, method: 'GET' })
  }, [])

  useEffect(() => {
    if (!response) return;
    setData(response.data);
  }, [response])
  
  return (
    <main className='w-full'>
      <h1 className='text-center'>cadastro de estoque</h1>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Senha</Table.Cell>
            <Table.Cell>Perfil</Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            data && data.length > 1 ? data.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item?.nome || '-'}</Table.Cell>
                <Table.Cell>{item?.email || '-'}</Table.Cell>
                <Table.Cell>{item?.senha || '-'}</Table.Cell>
                <Table.Cell>{item?.perfil || '-'}</Table.Cell>
              </Table.Row>
            ))
          :
            <Table.Row>
              <Table.Cell collSpan={4}>
                <p className='text-center align-middle'>Sem Dados</p>
              </Table.Cell>
            </Table.Row>

          }
        </Table.Body>
      </Table.Root>
    </main>
    
  );
}