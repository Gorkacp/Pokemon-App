import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detalle.css'; // Importa el archivo CSS

// Define el componente funcional Detalle
export function Detalle() {
  // Obtiene el parámetro idPokemon de la URL
  const { idPokemon } = useParams();
  // Define el estado local 'pokemon' y su función para actualizarlo 'setPokemon'
  const [pokemon, setPokemon] = useState(null);

  // useEffect se ejecuta cuando el componente se monta o cuando cambia idPokemon
  useEffect(() => {
    // Realiza una petición a la API de Pokémon para obtener los datos del Pokémon con el id especificado
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .then(response => response.json()) // Convierte la respuesta a JSON
      .then(data => setPokemon(data)); // Actualiza el estado 'pokemon' con los datos obtenidos
  }, [idPokemon]); // Dependencia: se ejecuta de nuevo si cambia idPokemon

  // Si los datos del Pokémon aún no se han cargado, muestra un mensaje de carga
  if (!pokemon) {
    return <div className="loading">Cargando...</div>;
  }

  // Si los datos del Pokémon se han cargado, muestra los detalles del Pokémon
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