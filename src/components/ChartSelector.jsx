import React from 'react';

// Importando os GIFs da pasta de assets
import gif5to10 from '../assets/5 - 10x.gif';
import gif10to100 from '../assets/10 - 100x.gif';
import gif10to500 from '../assets/10 - 500x.gif';
import gifIlimitado from '../assets/ILIMITADO.gif';

// Importando a imagem de fundo
import backgroundImage from '../assets/Imagem BASE - Planos.png';

const ChartSelector = () => {
  // Criando um objeto de estilo responsivo para o background
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    // Removidas as dimensões fixas para permitir responsividade
    // As dimensões agora são controladas pelo CSS
  };

  return (
    <section className="chart-selector-section" style={sectionStyle}>
      <div className="selector-content">
        <br/>
        <div className="selector-grid-wrapper">
          <div className="selector-grid">
            <div className="selector-card">
              <img src={gif5to10} alt="Animação do gráfico 5-10x" className="selector-gif" />
            </div>
            <div className="selector-card">
              <img src={gif10to100} alt="Animação do gráfico 10-100x" className="selector-gif" />
            </div>
            <div className="selector-card">
              <img src={gif10to500} alt="Animação do gráfico 10-500x" className="selector-gif" />
            </div>
            <div className="selector-card">
              <img src={gifIlimitado} alt="Animação do gráfico ilimitado" className="selector-gif" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartSelector;