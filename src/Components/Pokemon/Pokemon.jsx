import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pokemon.css'; // Importa el archivo CSS

function Pokemon() {
  // Define el estado para almacenar la lista de pokemons y la URL para la siguiente página de resultados
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=10');
  const navigate = useNavigate();

  // useEffect se ejecuta una vez al montar el componente para cargar los pokemons iniciales
  useEffect(() => {
    fetchPokemons(nextUrl);
  }, []);

  // Función para obtener los pokemons desde la API
  const fetchPokemons = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los nuevos pokemons y la URL para la siguiente página
        setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
        setNextUrl(data.next);
      });
  };

  // Función para manejar el evento de "Ver más"
  const handleViewMore = () => {
    fetchPokemons(nextUrl);
  };

  // Función para manejar el clic en un pokemon y navegar a la página de detalles
  const handlePokemonClick = (name) => {
    navigate(`/detalles/${name}`);
  };

  return (
    <div className="pokemon-container">
      <h1>Pokemons</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="pokemon-item" onClick={() => handlePokemonClick(pokemon.name)}>
            {/* Muestra la imagen y el nombre del pokemon */}
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
      {/* Botón para cargar más pokemons si hay una URL para la siguiente página */}
      {nextUrl && <button className="view-more-button" onClick={handleViewMore}>Ver más</button>}
    </div>
  );
}

export default Pokemon;