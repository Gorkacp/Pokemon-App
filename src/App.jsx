import { Header } from './components/header/header.jsx';
import Footer from './Components/Footer/Footer.jsx'; // Importación correcta sin llaves
import Jugar from './components/Jugar/Jugar.jsx'; // Importa el componente Jugar correctamente
import Error404 from './components/Error/Error.jsx';
import { Detalle } from './components/Detalle/Detalle.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx'; // Importa el componente LandingPage correctamente
import Login from './components/login/Login.jsx'; // Importa el componente Login correctamente
import Pokemon from './Components/Pokemon/Pokemon.jsx'; // Importa el componente Pokemons correctamente
import Ranking from './components/ranking/ranking.jsx'; // Importa el componente Ranking correctamente
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/detalles/:idPokemon" element={<Detalle />} />
          <Route path="/jugar" element={<Jugar />} /> {/* Usa Jugar en lugar de Juego */}
          <Route path="/login" element={<Login />} />
          <Route path="/pokemon" element={<Pokemon />} /> {/* Agrega la ruta para Pokemons */}
          <Route path="/ranking" element={<Ranking />} /> {/* Agrega la ruta para Ranking */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;