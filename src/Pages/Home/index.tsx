import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { api } from '@/Enviroments';
import { useAuth, useFetch } from '@/Hooks';

export const Home = () => {
  const auth = useAuth();
  const { empresa, dataLogin, user } = auth;

  const [lotesVencidos, setLotesVencidos] = useState([]);
  const [totalSaidas, setTotalSaidas] = useState([]);
  const [lotesAVencer, setLotesAVencer] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [response, fetchData] = useFetch<any>();

  useEffect(() => {
    if (!empresa) return;

    const headers = {
      Authorization: `Bearer ${dataLogin?.token}`
    };

    const fetchLotesVencidos = async () => {
      const url = `${api.url}/lote/vencido?empresa=${empresa.id}`;
      await fetchData(url, { headers, method: 'GET' });
    };

    const fetchTotalSaidas = async () => {
      const url = `${api.url}/saida/total?empresa=${empresa.id}&dataInicial=2024-01-01&dataFinal=2024-12-31&limit=10`;
      await fetchData(url, { headers, method: 'GET' });
    };

    fetchLotesVencidos();
    fetchTotalSaidas();
  }, [empresa, dataLogin?.token]);

  useEffect(() => {
    if (!response.data) return;

    if (response.data.arrExpiredLotes) {
      setLotesVencidos(response.data.arrExpiredLotes);
    }

    if (response.data.totalSaidas) {
      setTotalSaidas(response.data.totalSaidas);
    }

    if (response.data.arrExpiringLotes) {
      setLotesAVencer(response.data.arrExpiringLotes);
    }
  }, [response.data]);

  const handleFilterLotes = async () => {
    if (!empresa || !startDate || !endDate) return;

    const headers = {
      Authorization: `Bearer ${dataLogin?.token}`
    };

    const url = `${api.url}/lote/vencimento/30?empresa=${empresa.id}&dataInicial=${startDate}&dataFinal=${endDate}`;
    await fetchData(url, { headers, method: 'GET' });

    if (response.data && response.data.arrExpiringLotes) {
      setLotesAVencer(response.data.arrExpiringLotes);
    }
  };

  const dataLotesVencidos = [
    ["Produto", "Quantidade", { role: "style" }],
    ...lotesVencidos.map(lote => [`${lote.produto.descricao}\n${lote.codigoBarras}`, 1, "color: red"])
  ];

  const dataTotalSaidas = [
    ["Produto", "Quantidade"],
    ...totalSaidas.map(saida => [saida.produto, Number(saida.quantidade)])
  ];

  const dataLotesAVencer = [
    ["Produto", "Quantidade", { role: "style" }],
    ...lotesAVencer.map(lote => [`${lote.produto.descricao}\n${lote.codigoBarras}`, 1, "color: orange"])
  ];

  const options = {
    hAxis: { textStyle: { fontSize: 10 } },
    vAxis: { textStyle: { fontSize: 10 } },
    legend: { position: 'none' },
  };

  return (
    <div className="container mx-auto">
      <h1 className="mt-3 text-3xl font-bold text-center">Bem-vindo {user?.nome}</h1>

      <div className="p-5 mb-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-center">Filtrar Lotes a Vencer</h2>
        <div className="flex items-center justify-center">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            className="p-2 mr-2 border rounded-md" 
          />
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            className="p-2 mr-2 border rounded-md" 
          />
          <button 
            onClick={handleFilterLotes} 
            className="p-2 text-white bg-blue-500 rounded-md"
          >
            Filtrar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 p-6 md:grid-cols-12">
        <div className="col-span-6 md:col-span-6">
          <div className="p-5 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-xl font-bold text-center">Lotes Vencidos</h2>
            <Chart chartType="ColumnChart" width="100%" height="300px" data={dataLotesVencidos} options={options} />
          </div>
        </div>
        <div className="col-span-6 md:col-span-6">
          <div className="p-5 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-xl font-bold text-center">Total de Saídas</h2>
            <Chart chartType="LineChart" width="100%" height="300px" data={dataTotalSaidas} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-12">
          <div className="p-5 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-xl font-bold text-center">Lotes a Vencer</h2>
            <Chart chartType="ColumnChart" width="100%" height="300px" data={dataLotesAVencer} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};
