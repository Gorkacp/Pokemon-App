import './LandingPage.css';

function LandingPage() {
  console.log('LandingPage renderizado');
  return (
    <div className="landing-page">
      <h1 className="landing-page-title">Bienvenido a la Pokemons App</h1>
      <p className="landing-page-description">Conoce todos los Pokemons y juega con ellos</p>
      <nav className="landing-page-nav">
        <a className="landing-page-link" href="/pokemon">Ver Pokemons</a>
        <a className="landing-page-link" href="/jugar">Jugar</a>
      </nav>
    </div>
  );
}

export default LandingPage;