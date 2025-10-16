import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../Utils/api'

function ListUser() {
    const [listUser, setListUser] = useState([]);
  const navigate = useNavigate();

  const listDataUser = () => {
    api.get("/user")
    .then(response => {
      console.log("datos del api", response.data);
      setListUser(response.data)
    }).catch(error => {
      console.error("No se puedo obtener datos", error);
    })
  }

  useEffect(() => {
    listDataUser();
  }, []);

  const handleDelete = (user_id) => {
    console.log('eliminando', user_id);
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
        api.delete(`/user/${user_id}`, {headers: {'ngrok-skip-browser-warning': 'true'}})
          .then(response => {
            console.log('eliminado!!!!')
            listDataUser();
            Swal.fire('Eliminado', 'El usuario esta eliminado', 'success');
          }).catch(error => {
            console.error("No se puedo eliminar el registro datos", error);
            if (!(error.response && error.response.status === 401)) {
                Swal.fire('Error', 'Error al intentar eliminar al usuario', 'error');
            }
            
          })
      }
    });
  }


  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2>Listado de usuarios</h2>
        <button className='btn btn-primary' 
          onClick={() => navigate("/user/create")}
          >
            Crear usuario
        </button>
      </div>
      <table className='table table-striped table-bordered'>
          <thead className='table-dark'>
            <tr  >
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user) => (
               <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button className='btn btn-sm btn-warning' onClick={() => navigate(`/user/edit/${user._id}`)}>Editar</button>
                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
           
          </tbody>
      </table>
    </div>
  );
}

export default ListUser;