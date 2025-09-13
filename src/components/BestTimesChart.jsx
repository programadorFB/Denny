import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer // <-- This component needs to be imported
} from 'recharts';

// Definindo o componente CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#1F2937',
        border: '1px solid #4B5563',
        padding: '10px',
        borderRadius: '5px',
        color: '#E5E7EB',
      }}>
        <p className="label" style={{ fontWeight: 'bold' }}>{`Horário: ${label}:00`}</p>
        <p className="intro">{`Média: ${payload[0].value.toFixed(2)}x`}</p>
      </div>
    );
  }
  return null;
};

const BestTimesChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sortehub.online/api/dados');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Processar dados para criar médias por horário
        const hourlyAverages = data.reduce((acc, item) => {
          const hour = item.horario.split(':')[0]; // Pega apenas a hora
          if (!acc[hour]) {
            acc[hour] = { sum: 0, count: 0 };
          }
          acc[hour].sum += parseFloat(item.multiplier);
          acc[hour].count += 1;
          return acc;
        }, {});

        // Calcular médias e ordenar por horário
        const averagesArray = Object.keys(hourlyAverages)
          .map(hour => ({
            hour: parseInt(hour),
            average: hourlyAverages[hour].sum / hourlyAverages[hour].count
          }))
          .sort((a, b) => a.hour - b.hour);

        setChartData(averagesArray);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para gerar pontos do SVG baseados nos dados reais

  if (isLoading) {
    return (
      <section className="best-times-section">
        <h3>MÉDIA DOS MELHORES HORÁRIOS (DIA)</h3>
        <div className="line-chart-container">
          <p>Carregando dados...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="best-times-section">
        <h3>MÉDIA DOS MELHORES HORÁRIOS (DIA)</h3>
        <div className="line-chart-container">
          <p>Erro ao carregar os dados: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="best-times-section">
      <h3>MÉDIA DOS MELHORES HORÁRIOS (DIA)</h3>
      <div className="line-chart-container" style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value}x`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="#25D366" 
              strokeWidth={3}
              dot={{ fill: '#25D366', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#25D366', strokeWidth: 2, fill: '#FFFFFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default BestTimesChart;