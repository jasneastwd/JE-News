import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Textfield from '@material-ui/core/TextField';
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
					<Textfield
						id='filled-basic'
						label='Username'
						variant='filled'
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
					></Textfield>
					<br />

					<Textfield
						id='filled-basic'
						label='Full Name'
						variant='filled'
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
					></Textfield>
					<br />
					<Textfield
						id='filled-basic'
						label='Avatar URL'
						variant='filled'
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
					></Textfield>
					<br />
					<Button color='primary' variant='outlined'>
						Create User
					</Button>
				</form>
			</section>

			<h2 className='section-heading'>Existing users:</h2>
			<ul className='each-user'>
				{users.map((user) => {
					return (
						<Paper key={user.username} className='users-list '>
							<h2>Username: {user.username}</h2>
							<Avatar src={user.avatar_url} alt={user.username}></Avatar>
							<Button
								color='primary'
								variant='outlined'
								onClick={() => logIn(user)}
							>
								Choose User
							</Button>
						</Paper>
					);
				})}
			</ul>
		</div>
	);
};

export default Accounts;
