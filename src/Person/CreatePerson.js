import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../Utils/api'

function CreatePerson() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/person", 
                {
                    "name": name,
                    "lastname": lastname,
                    "age": parseInt(age)
                },
                {headers: {'ngrok-skip-browser-warning': 'true', "Authorization": localStorage.getItem("token")}}
            );

            navigate('/person');
        } catch (error) {
            console.log('Error', error);
            alert('Tuvo un error.')
        }
    }

    return (
        <div className="container mt-5">
            <h2>Crear Persona</h2>
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
                <button type='button' className="btn btn-secondary ms-2" 
                onClick={() => navigate('/')}>Cancelar</button>
            </form>
        </div>
    )
}

export default CreatePerson;