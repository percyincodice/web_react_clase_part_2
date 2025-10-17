import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import ListPerson from './Person/ListPerson';
import CreatePerson from './Person/CreatePerson';
import PersonDetail from './Person/PersonDetail';
import Login from './Login';
import ProtectedRoute from './Util/ProtectedRoute';
import Layout from './Components/Layout';

import ListUser from './User/ListUser';
import CreateUser from './User/CreateUser';
import UserDetail from './User/UserDetail';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute> } >
        <Route index element={<Navigate to="/person" replace />} />

        <Route path='person'>
          <Route index element={<ProtectedRoute><ListPerson /></ProtectedRoute>} />
          <Route path='create' element={<ProtectedRoute><CreatePerson /></ProtectedRoute>} />
          <Route path='edit/:id' element={<ProtectedRoute><PersonDetail /></ProtectedRoute>} />
        </Route>

        <Route path='user'>
          <Route index element={<ProtectedRoute><ListUser /></ProtectedRoute>} />
          <Route path='create' element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
          <Route path='edit/:id' element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
        </Route>

      </Route>


    </Routes>
  )
}

export default App;
