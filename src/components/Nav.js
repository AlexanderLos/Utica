import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Nav.css';

function Nav() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="NavBar">
      <div className="Title"><Link to="/">UTICA</Link></div>
      <div className="NavLinks">
        {!isAuthenticated ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/donate">Donate</Link>
          </>
        ) : (
          <>
            <Link to="/map">Map</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/swap">Swap</Link>
            {/* <Link to="/history">History</Link> */}
            <div className="navButton">
              <button onClick={logout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
