
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './Pages/Landing';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
