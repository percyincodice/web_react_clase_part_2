import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../Util/api';

function CreateUser() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/user", 
                {
                    "username": username,
                    "password": password,
                    "role": role
                }
            );

            navigate('/user');
        } catch (error) {
            console.log('Error', error);
            alert('Tuvo un error.')
        }
    }

    return (
        <div className="container mt-5">
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value) } />
                </div>
                <div className="mb-3">
                    <label className="form-label">Clave</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value) }/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value) }/>
                </div>
                <button type='submit' className="btn btn-success">Guardar</button>
                <button className="btn btn-secondary ms-2" 
                onClick={() => navigate('/user')}>Cancelar</button>
            </form>
        </div>
    )
}

export default CreateUser;