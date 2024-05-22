import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Registration';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

function App() {
  return (
    <>
    <Router>
      <Nav />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
