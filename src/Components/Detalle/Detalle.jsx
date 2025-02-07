import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detalle.css'; // Importa el archivo CSS

export function Detalle() {
  const { idPokemon } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, [idPokemon]);

  if (!pokemon) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="detalle-container">
      <h1 className="pokemon-name">{pokemon.name}</h1>
      <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className="pokemon-detail">Altura: {pokemon.height}</p>
      <p className="pokemon-detail">Peso: {pokemon.weight}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
}