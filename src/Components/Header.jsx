import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='Header'>
			<h1>
				<Link to='/' className='app-heading'>
					jasneastwd news{' '}
				</Link>
			</h1>
		</header>
	);
};

export default Header;
