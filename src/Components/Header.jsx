import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

const Header = () => {
	const { user } = useContext(UserContext);
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>Fake News </Link>
			</h1>
			<Link to={`/Users/${user.username}`}>
				<img src={user.avatar_url} alt={user.username} className='nav-img' />
			</Link>
		</header>
	);
};

export default Header;
