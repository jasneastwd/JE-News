import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccountByUsername } from '../Utils/api';
import { Link } from 'react-router-dom';

const Account = () => {
	const params = useParams();
	const [account, setAccount] = useState({});

	useEffect(() => {
		getAccountByUsername(params.username).then((accountFromApi) => {
			setAccount(accountFromApi);
		});
	}, [params.username]);
	return (
		<main className='individual-user'>
			<h2>Username: {account.username}</h2>
			<img src={account.avatar_url} alt={account.username}></img>
			<p>Name: {account.name}</p>
			<Link to='/Users'>
				<button className='myButton'>Switch User</button>
			</Link>
		</main>
	);
};

export default Account;
