import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import ListPerson from './Person/ListPerson';
import CreatePerson from './Person/CreatePerson';
import PersonDetail from './Person/PersonDetail';

import ListUser from './User/ListUser';
import CreateUser from './User/CreateUser';
import UserDetail from './User/UserDetail';

import Login from './Login';

import ProtectedRoute from './Utils/ProtectedRoute';

import Layout from './Components/Layout';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>} > 
        <Route index element={<Navigate to="/person" replace />} />

        <Route path="person" > 
          <Route index element={<ListPerson />} />
          <Route path='create' element={<CreatePerson />} />
          <Route path='edit/:id' element={<PersonDetail />} />
        </Route>

        <Route path="user" > 
          <Route index element={<ListUser />} />
          <Route path='create' element={<CreateUser />} />
          <Route path='edit/:id' element={<UserDetail />} />
        </Route>
      </Route>


      <Route path='*' element={<Navigate to='/person' replace />} />
    </Routes>
  )
}

export default App;

