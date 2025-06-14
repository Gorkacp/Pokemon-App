import './LandingPage.css';
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="landing-page-title">Bienvenido a la Pokemons App</h1>
      <p className="landing-page-description">Conoce todos los Pokemons y juega con ellos</p>
      <nav className="landing-page-nav">
        <Link className="landing-page-link" to="/pokemon">Ver Pokemons</Link>
        <Link className="landing-page-link" to="/jugar">Jugar</Link>
      </nav>
    </div>
  );
}


export default LandingPage;