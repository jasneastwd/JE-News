import { Link } from 'react-router-dom';

const Nav = () => {
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
			</div>
		</nav>
	);
};

export default Nav;
