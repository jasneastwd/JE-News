import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccountByUsername, patchUser } from '../Utils/api';
import { Link, useHistory } from 'react-router-dom';

const Account = () => {
	const history = useHistory();
	const params = useParams();
	const [account, setAccount] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const patchURL = {
		username: `${account.username}`,
		name: `${account.name}`,
		avatar_url: ``,
	};
	console.log(patchURL);

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
			setSubmitted(true);
			alert('avatar changed!');
			setNewAvatar(patchURL);
		});
	};
	if (submitted) {
		history.push(`/Users`);
	}

	return (
		<main className='individual-user'>
			<h2>Username: {account.username}</h2>
			<img src={account.avatar_url} alt={account.username}></img>
			<form onSubmit={updateUser}>
				<label htmlFor='avatar-patch'>Change Avatar</label>
				<input
					type='url'
					name='avatar-patch'
					value={newAvatar.avatar_url}
					required
					onChange={(e) => {
						setNewAvatar((patchURL) => {
							console.log(patchURL);
							return { ...patchURL, avatar_url: e.target.value };
						});
					}}
				></input>
				<button className='myButton'>Update avatar!</button>
			</form>
			<p>Name: {account.name}</p>
			<Link to='/Users'>
				<button className='myButton'>Back to Users</button>
			</Link>
		</main>
	);
};

export default Account;
