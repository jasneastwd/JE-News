import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

const Nav = () => {
	const { user } = useContext(UserContext);
	return (
		<nav className='Nav'>
			<div>
				<Link to='/topics' className='nav-links'>
					Topics{' '}
				</Link>
				<Link to='/articles' className='nav-links'>
					Articles{' '}
				</Link>
				<Link to='/Users' className='nav-links'>
					Login
				</Link>
				<Link to={`/Users/${user.username}`}>
					<img src={user.avatar_url} alt={user.username} className='nav-img' />{' '}
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
