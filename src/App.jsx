// Importo los componentes necesarios desde sus respectivas rutas
import { Header } from './Components/header/header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Jugar from './Components/Jugar/Jugar.jsx';
import Error404 from './Components/Error/Error.jsx';
import { Detalle } from './Components/Detalle/Detalle.jsx';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Login from './Components/Login/login.jsx';
import Pokemon from './Components/Pokemon/Pokemon.jsx';
import Ranking from './Components/ranking/ranking.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Define el componente principal de la aplicación
function App() {
  return (
    // Configuracion el enrutador de la aplicación
    <BrowserRouter>
      {/* Renderiza el componente Header */}
      <Header /> 
      <main>
        {/* Define las rutas de la aplicación */}
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route exact path="/" element={<LandingPage />} />
          {/* Ruta para la página de detalles de un Pokémon específico */}
          <Route path="/detalles/:idPokemon" element={<Detalle />} />
          {/* Ruta para la página de jugar */}
          <Route path="/jugar" element={<Jugar />} />
          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} />
          {/* Ruta para la página de Pokémon */}
          <Route path="/pokemon" element={<Pokemon />} />
          {/* Ruta para la página de ranking */}
          <Route path="/ranking" element={<Ranking />} />
          {/* Ruta para manejar cualquier otra ruta no definida (Error 404) */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      {/* Renderiza el componente Footer */}
      <Footer /> 
    </BrowserRouter>
  );
}
// Exporta el componente App como el componente por defecto
export default App;