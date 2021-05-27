import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/User';

import * as api from '../Utils/api';

const Accounts = () => {
	const [users, setUsers] = useState([]);
	const { setUser } = useContext(UserContext);
	const history = useHistory();
	const emptyUser = {
		username: ``,
		name: ``,
		avatar_url: ``,
	};
	const [newUser, setNewUser] = useState(emptyUser);
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		api.getUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, [newUser]);

	const addUser = (e) => {
		e.preventDefault();
		api.postUser(newUser).then(() => {
			setSubmitted(true);
			alert('user added!');
			setNewUser(emptyUser);
		});
	};
	if (submitted) {
		history.push(`/Users`);
	}

	const logIn = (user) => {
		setUser(user);
		history.push(`/`);
	};
	return (
		<div className='Users'>
			<section className='post-user-form'>
				<h2>Create a user:</h2>
				<form onSubmit={addUser}>
					<label htmlFor='user-username'>Username: </label>
					<input
						type='text'
						name='user-username'
						value={newUser.username}
						required
						onChange={(e) => {
							setNewUser((emptyUser) => {
								return {
									...emptyUser,
									username: e.target.value,
								};
							});
						}}
					></input>
					<br />
					<label htmlFor='user-name'>Name: </label>
					<input
						type='text'
						name='user-name'
						value={newUser.name}
						required
						onChange={(e) => {
							setNewUser((emptyUser) => {
								return {
									...emptyUser,
									name: e.target.value,
								};
							});
						}}
					></input>
					<br />
					<label htmlFor='user-avatar-url'>avatar_url: </label>
					<input
						type='text'
						name='user-avatar-url'
						value={newUser.avatar_url}
						required
						onChange={(e) => {
							setNewUser((emptyUser) => {
								return {
									...emptyUser,
									avatar_url: e.target.value,
								};
							});
						}}
					></input>
					<br />
					<button>Create User!</button>
				</form>
			</section>
			<main>
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
		</div>
	);
};

export default Accounts;
