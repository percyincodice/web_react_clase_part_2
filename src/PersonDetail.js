import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

function PersonDetail() {
    const { id } = useParams()

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:5000/api/person/${id}`, 
                {
                    "name": name,
                    "lastname": lastname,
                    "age": parseInt(age)
                }
            );

            navigate('/');
        } catch (error) {
            console.log('Error', error);
            alert('Tuvo un error.')
        }
    }

    const getPerson = () => {
         console.log('id valor', id);
        setError(false);
        setLoading(true);

        axios.get(`http://127.0.0.1:5000/api/person/${id}`, {headers: {'ngrok-skip-browser-warning': 'true'}})
        .then(response => {
            console.log("datos del api detalle", response.data);
            setName(response.data.name);
            setLastname(response.data.lastname);
            setAge(response.data.age);
            
            setError(false);
            setLoading(false);
        }).catch(error => {
         console.error("No se puedo obtener datos", error);
         setError(true);
          setLoading(false);
        })
    }

    useEffect(() => {
       getPerson();
    }, [id])

    if (error) {
        return (
            <div className='container mt-5'>
                <div className='alert alert-danger'>Error al cargar los datos.</div>
                <button className='btn btn-warning' onClick={() => getPerson()}>Reintentar</button>
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
            <h2>Editar Persona</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value) } />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value) }/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Edad</label>
                    <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value) }/>
                </div>
                <button type='submit' className="btn btn-success">Guardar</button>
                <button className="btn btn-secondary ms-2" 
                onClick={() => navigate('/')}>Cancelar</button>
            </form>
        </div>
    )
}

export default PersonDetail;