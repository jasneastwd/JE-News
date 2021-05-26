import React from 'react';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

const Home = () => {
	const { user } = useContext(UserContext);
	return (
		<main className='home-body'>
			<h1>Welcome back {user.username} </h1>
			<h2>
				Welcome to Fake News! The one place you can guarantee will provide ONLY
				Fake News, and nothing else!{' '}
			</h2>
		</main>
	);
};

export default Home;
