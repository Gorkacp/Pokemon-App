// Pokemons.jsx

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener los Pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, []);

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pokemons;
