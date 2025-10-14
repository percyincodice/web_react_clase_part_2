import React, {useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:5000/api/auth", 
                {
                    "username": username,
                    "password": password
                }
            );
            console.log("res", res)
            localStorage.setItem("token", res.data.token);
            Swal.fire('Success', 'Inicio sesion exitoso', 'success')
            navigate("/");
            
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Usuario o contraseña invalidos.', 'error')
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
            <div className='card p-4 shadow' style={{width: '22rem'}}>
                <h4 className='text-center mb-3'>Inicio de sesion</h4>
                <form onSubmit={handleSubmit}  >
                    <div className='mb-3'>
                        <label className='form-label'>Usuario</label>
                        <input type='text' className='form-control' value={username} required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Contraseña</label>
                        <input type='password' className='form-control' value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-primary w-100'>Iniciar sesion</button>
                </form>
            </div>
        </div>

    )
}

export default Login;