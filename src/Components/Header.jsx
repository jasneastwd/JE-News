import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>Fake News </Link>
			</h1>
		</header>
	);
};

export default Header;
