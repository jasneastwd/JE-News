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

	useEffect(() => {
		api.getUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, [newUser]);

	const addUser = (e) => {
		e.preventDefault();
		api.postUser(newUser).then(() => {
			alert('user added!');
			setNewUser(emptyUser);
			history.push(`/Users`);
		});
	};

	const logIn = (user) => {
		setUser(user);
		history.push(`/`);
	};
	return (
		<div className='Users'>
			<section className='post-user-form'>
				<h2>Create a user:</h2>
				<form onSubmit={addUser}>
					<label htmlFor='user-username' className='post-user-label'>
						Username:{' '}
					</label>
					<input
						className='post-box'
						type='text'
						id='user-username'
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
					<label htmlFor='user-name' className='post-user-label'>
						Name:{' '}
					</label>
					<input
						className='post-box'
						type='text'
						id='user-name'
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
					<label htmlFor='user-avatar-url' className='post-user-label'>
						Photo:{' '}
					</label>
					<input
						className='post-box'
						type='text'
						id='user-avatar-url'
						value={newUser.avatar_url}
						required
						placeholder='Paste URL here'
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
					<button className='myButton'>Create User</button>
				</form>
			</section>

			<h2 className='section-heading'>Existing users:</h2>
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
		</div>
	);
};

export default Accounts;
