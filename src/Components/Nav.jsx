import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';

const Nav = () => {
	const { user } = useContext(UserContext);
	return (
		<nav className='Nav'>
			<Link to={`/Users/${user.username}`}>
				<Avatar src={user.avatar_url} alt={user.username}></Avatar>{' '}
			</Link>
			<Link to='/topics' className='nav-links'>
				Topics{' '}
			</Link>
			<Link to='/articles' className='nav-links'>
				Articles{' '}
			</Link>
			<Link to='/Users' className='nav-links'>
				Login
			</Link>
		</nav>
	);
};

export default Nav;
