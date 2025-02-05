import './App.css'
import './components/Static/Static'
import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";


import Landing from './components/LandingPage/LandingPage/'
import Pokedex from './components/Pokedex/Pokedex'
import Midware from './utils/Midware';
import Detalle from './components/Detalle/Detalle'
import Login from './components/Login/Login'
import Play from './components/Jugar/Jufar';
import Error from './components/Error/Error';

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <Static></Static>
          <main id="main">
            <Outlet></Outlet>
          </main>
        </>
      ),
      children:[
        {
          path: "/",
          element: <Landing></Landing>
        },
        {
          path: "/pokedex",
          element: <Pokedex></Pokedex>,
        },
        {
          path: "/pokedetalle/:id",
          element: <Detalle></Detalle>
        },
        {
          path: "/play",
          element: <Midware Component={Play}></Midware>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "*",
          element:
            <Error></Error>
        }
      ]
    },
  ]);

  return (
    <>
      
        <RouterProvider router={router} /> 
      
    </>
  )
}

export default App