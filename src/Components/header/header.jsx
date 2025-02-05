// Header.js
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/pokemons">Pokemons</Link>
        <Link to="/jugar">Jugar</Link>
      </nav>
    </header>
  );
}

export default Header;
