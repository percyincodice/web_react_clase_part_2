import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../Utils/api'

function ListPerson() {
    const [listPerson, setListPerson] = useState([]);
  const navigate = useNavigate();

  const listDataPerson = () => {
    api.get("/person")
    .then(response => {
      console.log("datos del api", response.data);
      setListPerson(response.data)
    }).catch(error => {
      console.error("No se puedo obtener datos", error);
    })
  }

  useEffect(() => {
    listDataPerson();
  }, []);

  const handleDelete = (person_id) => {
    console.log('eliminando', person_id);
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion eliminara el registro permanentemente!!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No'
    })
    .then((result) => {
      if (result.isConfirmed) {
        api.delete(`/person/${person_id}`, {headers: {'ngrok-skip-browser-warning': 'true'}})
          .then(response => {
            console.log('eliminado!!!!')
            listDataPerson();
            Swal.fire('Eliminado', 'La persona esta eliminada', 'success');
          }).catch(error => {
            console.error("No se puedo eliminar el registro datos", error);
            if (!(error.response && error.response.status === 401)) {
                Swal.fire('Error', 'Error al intentar eliminar a la persona', 'error');
            }
            
          })
      }
    });
  }


  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2>Listado de personas</h2>
        <button className='btn btn-primary' 
          onClick={() => navigate("/person/create")}
          >
            Crear persona
        </button>
      </div>
      <table className='table table-striped table-bordered'>
          <thead className='table-dark'>
            <tr  >
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listPerson.map((person) => (
               <tr key={person._id}>
                <td>{person.name}</td>
                <td>{person.lastname}</td>
                <td>{person.age}</td>
                <td>
                  <button className='btn btn-sm btn-warning' onClick={() => navigate(`/person/edit/${person._id}`)}>Editar</button>
                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(person._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
           
          </tbody>
      </table>
    </div>
  );
}

export default ListPerson;