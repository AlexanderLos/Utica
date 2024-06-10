import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './css/App.css';
import Donate from './components/Donate';
import Map from './components/Map';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Registration';
import History from './components/History';
import Testmap from './components/Testmap'; 
import { AuthProvider, useAuth } from './components/AuthContext'; 

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to='/login' />;
};


function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <Nav />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path='/donate' element={<Donate/>} />
            <Route path="/" element={<Register />} />
            <Route path="/map" element={<PrivateRoute element={<Map />} />} />
            <Route path="/History" element={<History />} />
            <Route path="/testmap" element={<Testmap />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
