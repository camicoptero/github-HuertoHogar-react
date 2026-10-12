import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './inicio.module.css';

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Manzanas Fuji",
    imagen: "https://jumbocl.vtexassets.com/arquivos/ids/357731-250-250/Manzana-Fuji-granel.jpg?v=638776720527670000",
    descripcion: "Descripción: Manzanas Fuji crujientes y dulces...",
    precio: "1200 x kilo"
  },
  {
    id: 2,
    nombre: "Naranjas Valencianas",
    imagen: "https://citrofrut.com/noticias/wp-content/uploads/2023/02/shutterstock_173674910-scaled.jpg",
    descripcion: "Jugosas y ricas en vitamina C...",
    precio: "1000 x kilo"
  },
  {
    id: 3,
    nombre: "Platanos cavendish",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFiQ-9YzkzCC3xsFeVN7GSGdjdSV58dWy28PVbyG_TOQ&s=10",
    descripcion: "Plátanos maduros y dulces...",
    precio: "800 x kilo"
  },
  {
    id: 4,
    nombre: "Peras Williams",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLTNol9HDVK5XGlsmZOccD01Z7RUR2KxrP9efghbW5yI8_3IAVHkcCxa_hGnTwscx8aWtUw4t9_wfriJd3sveCh1DnAYrRSu5euyZffSID&s=10",
    descripcion: "Peras jugosas y dulces...",
    precio: "1500 x kilo"
  }
];

export function Inicio() {
  const [mensaje, setMensaje] = useState("");

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = [...carritoActual, producto];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    
setMensaje(`Producto "${producto.nombre}" agregado al carrito.`);
  };

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand" to="/">bienvenido a Huerto Hogar</h1>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/iniciar-sesion">Cuenta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">Carrito</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}


      <div className="text-center my-3">
  
        
      </div>


      <main className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {PRODUCTOS.map((producto) => (
            <div className="col" key={producto.id}>
              <div className="card h-100 p-3 align-items-center">
                <h3>{producto.nombre}</h3>
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  
                />
                <p className="mt-2">{producto.descripcion}</p>
                <h4 className="text-danger">{producto.precio}</h4>
                <button 
                  className="btn btn-primary mt-auto" 
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}