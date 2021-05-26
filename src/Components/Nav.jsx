import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav className='Nav'>
			<div>
				<Link to='/topics'>Topics </Link>
				<Link to='/articles'>Articles </Link>

				<Link to='/Users'>Login</Link>
			</div>
		</nav>
	);
};

export default Nav;
