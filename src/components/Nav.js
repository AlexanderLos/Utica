import { Link } from 'react-router-dom';
import '../css/Nav.css';

function Nav() {
  return (
    <nav className="NavBar">
      <div className="Title"><Link to="/">UTICA</Link></div>
      <div className="NavLinks">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Settings">Settings</Link>
      </div>
    </nav>
  );
}

export default Nav;
