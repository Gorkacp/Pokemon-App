
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

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/detalles/:idPokemon" element={<Detalle />} />
          <Route path="/jugar" element={<Jugar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;