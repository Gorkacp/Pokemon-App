// Jugar.js

function Jugar() {
  const [answer, setAnswer] = useState('');
  const [pokemon, setPokemon] = useState('pikachu'); // Cambiar por el Pokemon que se va a adivinar
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === pokemon) {
      setMessage('¡Correcto!');
    } else {
      setMessage('Intenta de nuevo');
    }
  };

  return (
    <div>
      <h1>Juego de Adivina el Pokemon</h1>
      <p>Adivina el nombre del Pokemon</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escribe el nombre del Pokemon"
        />
        <button type="submit">Adivinar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Jugar;
