import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FullChart from './components/FullChart';
import ChartSelector from './components/ChartSelector';
import BestTimesChart from './components/BestTimesChart';
import HourlyStats from './components/HourlyStats';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <FullChart />
        <ChartSelector />
        <BestTimesChart />
        <HourlyStats />
      </main>
    </div>
  );
}

export default App;