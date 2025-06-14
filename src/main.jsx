// Importa StrictMode de la biblioteca de React
import { StrictMode } from 'react'

// Importa createRoot de la biblioteca react-dom/client
import { createRoot } from 'react-dom/client'

// Importa el componente principal de la aplicación desde el archivo App.jsx
import App from './App.jsx'

// Crea una raíz de React en el elemento con id 'root' en el documento HTML
createRoot(document.getElementById('root')).render(
  // Renderiza la aplicación dentro del modo estricto de React
  <StrictMode>
    <App />
  </StrictMode>,
)