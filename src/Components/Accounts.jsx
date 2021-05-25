import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import * as api from '../Utils/api';

const Accounts = () => {
	const [users, setUsers] = useState([]);
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		api.getUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, []);

	const logIn = (user) => {
		setUser(user);
	};
	return (
		<main className='Users'>
			<h2>Choose a user:</h2>
			<ul className='each-user'>
				{users.map((user) => {
					return (
						<li key={user.username} className='users-list '>
							<h2>Username: {user.username}</h2>
							<Link to={`users/${user.username}`}>
								<img src={user.avatar_url} alt={user.username}></img>
								<button className='myButton' onClick={() => logIn(user)}>
									Set User
								</button>
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default Accounts;
