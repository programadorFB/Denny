import React from 'react';
// Passo 1: Importe o GIF da sua pasta de assets.
// O caminho '../assets/' assume que a pasta 'assets' está dentro de 'src'.
import headerGif from '../assets/Cabeçalho DESKTOP.gif';

const Header = () => {
  return (
    <header className="app-header">
      {/* Passo 2: Use a tag <img> com o GIF importado */}
      <img src={headerGif} alt="Cabeçalho animado" className="header-gif" />
    </header>
  );
};

export default Header;