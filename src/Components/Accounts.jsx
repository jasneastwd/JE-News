import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import * as api from '../Utils/api';

const Accounts = () => {
	const [users, setUsers] = useState([]);
	const { setUser } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		api.getUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, []);

	const logIn = (user) => {
		setUser(user);
		history.push(`/`);
	};
	return (
		<main className='Users'>
			<h2>Choose a user:</h2>
			<ul className='each-user'>
				{users.map((user) => {
					return (
						<li key={user.username} className='users-list '>
							<h2>Username: {user.username}</h2>
							<img src={user.avatar_url} alt={user.username}></img>
							<button className='myButton' onClick={() => logIn(user)}>
								Choose User
							</button>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default Accounts;
