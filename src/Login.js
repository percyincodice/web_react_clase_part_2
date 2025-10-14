import React, { useState } from 'react';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from './Utils/api'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth', {
        username,
        password,
      });
      console.log("res", res);
      
      localStorage.setItem('token', res.data.token || 'dummy-token');
      Swal.fire('✅ Success', 'Login successful!', 'success');
      navigate('/');
    } catch (error) {
      console.error(error);
      Swal.fire('❌ Error', 'Invalid username or password', 'error');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '22rem' }}>
        <h4 className="text-center mb-3">Inicio sesion</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
