import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './css/App.css';
import Map from './components/Map';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Registration';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
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
            <Route path="/register" element={<Register />} />
            {/* <Route path="/map" element={<PrivateRoute element={<Map />} />} /> */}
            <Route path="/map" element={<Map />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/testmap" element={<Testmap />} /> 
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
