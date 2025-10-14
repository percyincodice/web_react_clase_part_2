import {Routes, Route} from 'react-router-dom';
import './App.css';
import ListPerson from './ListPerson';
import CreatePerson from './CreatePerson';
import PersonDetail from './PersonDetail';
import Login from './Login';
import ProtectedRoute from './Util/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute><ListPerson /></ProtectedRoute> } />
      <Route path='/create' element={<ProtectedRoute><CreatePerson /></ProtectedRoute>} />
      <Route path='/edit/:id' element={<ProtectedRoute><PersonDetail /></ProtectedRoute>} />
    </Routes>
  )
}

export default App;
