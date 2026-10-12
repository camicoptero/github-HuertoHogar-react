
import { IniciarSesion } from './pages/Iniciar Sesion/Iniciar_sesion';
import { Inicio } from './pages/inicio/inicio';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Carrito } from './pages/carrito/carrito';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}