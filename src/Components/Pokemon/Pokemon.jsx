import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pokemon.css'; // Importa el archivo CSS

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=10');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemons(nextUrl);
  }, []);

  const fetchPokemons = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
        setNextUrl(data.next);
      });
  };

  const handleViewMore = () => {
    fetchPokemons(nextUrl);
  };

  const handlePokemonClick = (name) => {
    navigate(`/detalles/${name}`);
  };

  return (
    <div className="pokemon-container">
      <h1>Pokemons</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="pokemon-item" onClick={() => handlePokemonClick(pokemon.name)}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
      {nextUrl && <button className="view-more-button" onClick={handleViewMore}>Ver más</button>}
    </div>
  );
}

export default Pokemon;