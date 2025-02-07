import { useState, useEffect } from 'react';
import { Link } from "react-router";

import { Detalle } from './Detalle/Detalle.jsx';

export function Listado() {
  const [data, setData] = useState([]);
  const [dataPropio, setDataPropio] = useState([]);
  const [offset, setOffset] = useState(0);

  const cargar = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setData(prevData => [...data.results]); 
        setOffset(prevOffset => prevOffset + 8);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    cargar();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      data.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(dataPropio => {
            setDataPropio(prevState => [...prevState, dataPropio]); 
          })
          .catch(error => console.error('Error al obtener el Pokémon:', error));
      });
    }
  }, [data]); 

  const mostrar = dataPropio.map((datoPropio) => (
    <div key={datoPropio.id} className='card'>
      <img className='card-img' src={datoPropio.sprites.other['official-artwork'].front_default} alt={datoPropio.species.name} />
      <div className="card-body">
        <h5 className="card-title">{datoPropio.species.name}</h5>
        <Link className="link" to={`/detalles/${datoPropio.id}`}>
          <button className="btn-ver">Ver más</button>
        </Link>
      </div>
    </div>
  ));

  return (
    <>
      <div className='contenedor'>
        {mostrar}
        <button className='btn-cargar' onClick={cargar}>Cargar más Pokémons</button>
      </div>
    </>
  );
}
