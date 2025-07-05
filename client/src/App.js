import './App.css';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/main';
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />     
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
