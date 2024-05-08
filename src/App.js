import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Registration';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Settings from './components/Settings';

function App() {
  return (
    <>
      <Nav />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
