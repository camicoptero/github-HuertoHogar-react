import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './carrito.module.css';

export function Carrito() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setItems(carritoGuardado);
  }, []);

  const vaciarCarrito = () => {
    localStorage.removeItem('carrito');
    setItems([]);
  };

  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link to="/" className="btn btn-outline-secondary">← Volver al Inicio</Link>
      </nav>

      <h2>Tu Carrito de Compras</h2>

      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {items.map((prod, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img src={prod.imagen} alt={prod.nombre} style={{ width: '50px', height: '50px' }} />
                  <div>
                    <strong>{prod.nombre}</strong>
                    <br />
                    <small>{prod.precio}</small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={vaciarCarrito} className="btn btn-danger">
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
}