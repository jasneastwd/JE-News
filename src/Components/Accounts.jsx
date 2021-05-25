import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../Utils/api';

const Accounts = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, []);
	return (
		<main className='Users'>
			<h2>All Users</h2>
			<ul className='each-user'>
				{users.map(({ username, avatar_url, name }) => {
					return (
						<li key={username} className='users-list '>
							<Link to={`users/${username}`}>
								<h2>Username: {username}</h2>
							</Link>
							<img src={avatar_url} alt={username}></img>
							<button className='myButton'>Set User</button>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default Accounts;
