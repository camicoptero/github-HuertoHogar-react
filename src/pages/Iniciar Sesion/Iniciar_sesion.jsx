import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './iniciar_sesion.module.css';


export function IniciarSesion() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const guardar = (e) => {
    e.preventDefault();

    if (!usuario.trim()) {
      alert("EL NOMBRE DE USUARIO NO DEBE ESTAR VACÍO");
      return;
    }
    if (!correo.trim()) {
      alert("EL CORREO NO PUEDE ESTAR VACÍO");
      return;
    }

    const datosUsuario = {
      Nombre_usuario: usuario,
      correo_electronico: `${correo}@gmail.com`
    };

   localStorage.setItem("clave_storage", JSON.stringify(datosUsuario));
    alert("Sesión iniciada con éxito");

    navigate('/');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={guardar}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Correo electrónico (sin @gmail.com)"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <span className="input-group-text">@gmail.com</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Aceptar
          </button>
          <Link to="/" className="btn btn-link">
            Inicio
          </Link>
        </div>
      </form>
    </div>
  );
}