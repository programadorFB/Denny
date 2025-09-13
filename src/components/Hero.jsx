import React from 'react';
// Exemplo usando react-icons
import { FaCheckCircle } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero-section">
      <FaCheckCircle className="check-icon" size={60} />
      <h1>
        MINUTAGEM DA MÁQUINA NA PALMA DA SUA MÃO! AVIATOR COMO NUNCA VISTO.
      </h1>
    </section>
  );
};

export default Hero;