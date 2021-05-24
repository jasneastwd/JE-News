import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav className='Nav'>
			<Link to='/topics'>Topics </Link>
			<Link to='/articles'>Articles </Link>
			<Link to='/Post'>Post </Link>
			<Link to='/users'>Account </Link>
		</nav>
	);
};

export default Nav;
