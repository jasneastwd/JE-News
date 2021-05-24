import { useEffect, useState } from 'react';

import { getUsers } from '../Utils/api';

const Accounts = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, []);
	return (
		<ul>
			{users.map(({ username, avatar_url, name }) => {
				return (
					<li key={username} className='users-list'>
						<h2>Username: {username}</h2>
						<img src={avatar_url} alt={username}></img>
						<p>Name: {name}</p>
					</li>
				);
			})}
		</ul>
	);
};

export default Accounts;
