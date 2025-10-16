import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from '../Utils/api'

function UserDetail() {
    const { id } = useParams()

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {             
            await api.put(`/user/${id}`,
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

    const getUser = () => {
         console.log('id valor', id);
        setError(false);
        setLoading(true);

        api.get(`/user/${id}`)
        .then(response => {
            console.log("datos del api detalle", response.data);
            setUsername(response.data.username);
            //setPassword(response.data.password);
            setRole(response.data.role);
            
            setError(false);
            setLoading(false);
        }).catch(error => {
         console.error("No se puedo obtener datos", error);
         setError(true);
          setLoading(false);
        })
    }

    useEffect(() => {
       getUser();
    }, [id])

    if (error) {
        return (
            <div className='container mt-5'>
                <div className='alert alert-danger'>Error al cargar los datos.</div>
                <button className='btn btn-warning' onClick={() => getUser()}>Reintentar</button>
            </div>
        )
    }

    if (loading) {
        return (
            <div className='container mt-5'>
                <div className='alert alert-warning'>Cargando datos...</div>                
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h2>Editar user</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value) } />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
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

export default UserDetail;