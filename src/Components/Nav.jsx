import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="Nav">
      <Link to="/topics" className="nav-links">
        Topics{' '}
      </Link>
      <Link to="/articles" className="nav-links">
        Articles{' '}
      </Link>
      <Link to="/Users" className="nav-links">
        Login
      </Link>
      <Link to={`/Users/${user.username}`} className="nav-links">
        Profile
      </Link>
    </nav>
  );
};

export default Nav;
