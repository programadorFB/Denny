import React, { useState, useEffect } from 'react';
import HotMoments from '../assets/Momentos QUENTES.gif'; // <-- Import the GIF here

const HourlyStats = () => {
  const [stats, setStats] = useState({
    topHours: [],
    lowHours: []
  });
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
          const hour = item.horario; // Manter horário completo
          if (!acc[hour]) {
            acc[hour] = { sum: 0, count: 0, values: [] };
          }
          const valor = parseFloat(item.multiplier);
          acc[hour].sum += valor;
          acc[hour].count += 1;
          acc[hour].values.push(valor);
          return acc;
        }, {});

        // Calcular médias e ordenar
        const averagesArray = Object.keys(hourlyAverages).map(hour => ({
          hour,
          average: hourlyAverages[hour].sum / hourlyAverages[hour].count,
          count: hourlyAverages[hour].count,
          maxValue: Math.max(...hourlyAverages[hour].values)
        }));

        // Filtrar apenas horários com dados suficientes (pelo menos 2 ocorrências)
        const significantHours = averagesArray.filter(item => item.count >= 2);

        // Ordenar por média (maiores primeiro para ganhos, menores para perdas)
        const sortedByAverage = [...significantHours].sort((a, b) => b.average - a.average);
        
        // Top 3 horários com melhores médias
        const topHours = sortedByAverage.slice(0, 3);
        
        // Bottom 3 horários com piores médias
        const lowHours = sortedByAverage.slice(-3).reverse();

        setStats({
          topHours,
          lowHours
        });
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
      <section className="hourly-stats-section">
        <div className="stats-column">
          <h4>HORÁRIOS QUENTES</h4>
          <p>Carregando dados...</p>
        </div>
        <div className="stats-divider"></div>
        <div className="stats-column">
          <h4>HORÁRIOS FRIOS</h4>
          <p>Carregando dados...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hourly-stats-section">
        <div className="stats-column">
          <h4>HORÁRIOS QUENTES</h4>
          <p>Erro ao carregar: {error}</p>
        </div>
        <div className="stats-divider"></div>
        <div className="stats-column">
          <h4>HORÁRIOS FRIOS</h4>
          <p>Erro ao carregar: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hourly-stats-section">
      <div className="stats-column">
        <h4>HORÁRIOS QUENTES</h4>
        <p>VISÃO DIÁRIA</p>
        <ul>
          {stats.topHours.map((item, index) => (
            <li key={index}>
              <span>{item.hour}</span>
              <span>{item.average.toFixed(2)}X</span>
            </li>
          ))}
        </ul>
        {stats.topHours.length === 0 && <p>Dados insuficientes</p>}
      </div>
      
      <div className="stats-divider">
        {/* Usando a imagem importada */}
        <img src={HotMoments} alt="Momentos Quentes" className="stats-divider-gif" />
      </div>
      
      <div className="stats-column">
        <h4>HORÁRIOS FRIOS</h4>
        <p>VISÃO DIÁRIA</p>
        <ul>
          {stats.lowHours.map((item, index) => (
            <li key={index}>
              <span>{item.hour}</span>
              <span>{item.average.toFixed(2)}X</span>
            </li>
          ))}
        </ul>
        {stats.lowHours.length === 0 && <p>Dados insuficientes</p>}
      </div>
    </section>
  );
};

export default HourlyStats;