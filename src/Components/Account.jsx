import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccountByUsername, patchUser } from '../Utils/api';
import { Link, useHistory } from 'react-router-dom';

const Account = () => {
	const history = useHistory();
	const params = useParams();
	const [account, setAccount] = useState({});

	const patchURL = {
		username: `${account.username}`,
		name: `${account.name}`,
		avatar_url: ``,
	};

	const [newAvatar, setNewAvatar] = useState(patchURL);

	useEffect(() => {
		getAccountByUsername(params.username).then((accountFromApi) => {
			setAccount(accountFromApi);
		});
	}, [params.username]);

	const updateUser = (e) => {
		e.preventDefault();
		patchURL.avatar_url = newAvatar.avatar_url;
		patchUser(patchURL).then(() => {
			alert('avatar changed!');

			setNewAvatar(patchURL);
			history.push(`/Users`);
		});
	};

	return (
		<main className='individual-user'>
			<h2>Username: {account.username}</h2>
			<img src={account.avatar_url} alt={account.username}></img>
			<p className='name-p'>Name: {account.name}</p>
			<form onSubmit={updateUser}>
				<label htmlFor='avatar-patch'>Change Avatar</label>
				<input
					className='post-box'
					type='url'
					id='avatar-patch'
					value={newAvatar.avatar_url}
					required
					onChange={(e) => {
						setNewAvatar((patchURL) => {
							console.log(patchURL);
							return { ...patchURL, avatar_url: e.target.value };
						});
					}}
				></input>{' '}
				<br />
				<button className='myButton'>Update Avatar</button>
			</form>

			<Link to='/Users'>
				<button className='myButton'>Back to Users</button>
			</Link>
		</main>
	);
};

export default Account;
