import React, { useState } from 'react';
import './FormularioRegistro.css';

function FormularioRegistro() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    edad: '',
    contrasena: '',
    region: '',
    comuna: ''
  });

  const [errores, setErrores] = useState({});
  const regionesYComunas = {
    // Puedes mover este objeto a src/data/regionesYComunas.js si prefieres mantenerlo externo
    "Región Metropolitana de Santiago": ["Macul", "Ñuñoa", "Providencia", "Santiago"],
    "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué"]
    // Agrega más regiones y comunas como desees
  };

  const validar = () => {
    const nuevosErrores = {};

    if (datos.nombre.trim() === '') {
      nuevosErrores.nombre = 'Debes ingresar tu nombre.';
    }

    if (!/\S+@\S+\.\S+/.test(datos.correo)) {
      nuevosErrores.correo = 'Correo no válido.';
    }

    if (!/^\+56 9 \d{4} \d{4}$/.test(datos.telefono)) {
      nuevosErrores.telefono = 'Formato debe ser +56 9 XXXX XXXX.';
    }

    const edadNum = parseInt(datos.edad);
    if (isNaN(edadNum) || edadNum < 18 || edadNum > 120) {
      nuevosErrores.edad = 'La edad debe estar entre 18 y 120 años.';
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(datos.contrasena)) {
      nuevosErrores.contrasena = 'La contraseña debe tener mayúscula, minúscula y número.';
    }

    if (datos.region === '') {
      nuevosErrores.region = 'Selecciona una región.';
    }

    if (datos.comuna === '') {
      nuevosErrores.comuna = 'Selecciona una comuna.';
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validaciones = validar();
    if (Object.keys(validaciones).length === 0) {
      alert('¡Registro exitoso! 🎉');
      setDatos({
        nombre: '',
        correo: '',
        telefono: '',
        edad: '',
        contrasena: '',
        region: '',
        comuna: ''
      });
      setErrores({});
    } else {
      setErrores(validaciones);
    }
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.id]: e.target.value });
  };

  const comunasDisponibles = regionesYComunas[datos.region] || [];

  return (
    <form className="formulario-registro" onSubmit={handleSubmit}>
      <h2>🌿 Regístrate para recibir nuevas recetas</h2>

      <input id="nombre" placeholder="Nombre Completo" value={datos.nombre} onChange={handleChange} />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      <input id="correo" placeholder="Correo Electrónico" value={datos.correo} onChange={handleChange} />
      {errores.correo && <p className="error">{errores.correo}</p>}

      <input id="telefono" placeholder="+56 9 XXXX XXXX" value={datos.telefono} onChange={handleChange} />
      {errores.telefono && <p className="error">{errores.telefono}</p>}

      <input id="edad" type="number" placeholder="Edad" value={datos.edad} onChange={handleChange} />
      {errores.edad && <p className="error">{errores.edad}</p>}

      <input id="contrasena" type="password" placeholder="Contraseña segura" value={datos.contrasena} onChange={handleChange} />
      {errores.contrasena && <p className="error">{errores.contrasena}</p>}

      <label htmlFor="region">Región:</label>
      <select id="region" value={datos.region} onChange={handleChange}>
        <option value="">Seleccione Región</option>
        {Object.keys(regionesYComunas).map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      {errores.region && <p className="error">{errores.region}</p>}

      <label htmlFor="comuna">Comuna:</label>
      <select id="comuna" value={datos.comuna} onChange={handleChange}>
        <option value="">Seleccione Comuna</option>
        {comunasDisponibles.map((comuna) => (
          <option key={comuna} value={comuna}>{comuna}</option>
        ))}
      </select>
      {errores.comuna && <p className="error">{errores.comuna}</p>}

      <button type="submit">Registrarse 🌸</button>
    </form>
  );
}

export default FormularioRegistro;