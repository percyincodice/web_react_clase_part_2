import React, {useState} from 'react';
import Swal from 'sweetalert2';
import api from './Util/api'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth", {
                "username": username,
                "password": password
            })

            console.log("res", res);

            localStorage.setItem("token", res.data.token);
            Swal.fire("Exito", "Inicio de sesion exitoso.", "success")
            navigate("/");
            
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Usuario y/o contraseña incorrectos", "error")
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
            <div className='card p-4 shadow' style={{width: '22rem'}}>
                <h4 className='text-center mb-3'>Inicio sesion</h4>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Usuario</label>
                        <input type='text' className='form-control' required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Contraseña</label>
                        <input type='password' className='form-control' required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-primary w-100'>Iniciar sesion</button>
                </form>
            </div>

        </div>
    )
}

export default Login;