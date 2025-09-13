import React, { useState, useEffect } from 'react';

const ChartItem = ({ multiplier, time, color }) => (
  <div className={`chart-item ${color}`}>
    <span className="multiplier">{multiplier}</span>
    <span className="time">{time}</span>
  </div>
);

const FullChart = () => {
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
        
        // Ordenar por timestamp (mais recente primeiro)
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateB - dateA;
        });

        const formattedData = sortedData.map(item => ({
          multiplier: item.valor, // Já vem formatado como "2.35x"
          time: item.horario,
          color: item.multiplier >= 100 ? 'green' : item.multiplier >= 50 ? 'purple' : 'blue',
        }));

        setChartData(formattedData);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="full-chart-section">
        <h2>GRÁFICO COMPLETO</h2>
        <p>Carregando dados...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="full-chart-section">
        <h2>GRÁFICO COMPLETO</h2>
        <p>Erro ao carregar os dados: {error}</p>
      </section>
    );
  }

  return (
    <section className="full-chart-section">
      <h2>GRÁFICO COMPLETO</h2>
      <div className="chart-grid">
        {chartData.slice(0, 15).map((item, index) => (
          <ChartItem key={index} {...item} />
        ))}
      </div>
      <button className="show-more-btn">MOSTRAR MAIS</button>
    </section>
  );
};

export default FullChart;