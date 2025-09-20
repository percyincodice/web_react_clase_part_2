import {Routes, Route} from 'react-router-dom';
import './App.css';
import ListPerson from './ListPerson';
import CreatePerson from './CreatePerson';
import PersonDetail from './PersonDetail';


function App() {
  return (
    <Routes>
      <Route path='/' element={<ListPerson />} />
      <Route path='/create' element={<CreatePerson />} />
      <Route path='/edit/:id' element={<PersonDetail />} />
    </Routes>
  )
}

export default App;
