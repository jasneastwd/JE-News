import React from 'react';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

const Home = () => {
	const { user } = useContext(UserContext);
	return (
		<main className='home-body'>
			<h1>Welcome back {user.username} </h1>
			<h2>
				Welcome to <strong>jasneastwd news!</strong> This is my first full-stack
				project, involving both back-end and front-end development! <br />
				<br />
				This is my first project which took approximately 10 days to build
				during my time at <a href='https://northcoders.com'>NorthCoders</a>.
				<br />
				<br />
				Feel free to have a look around: post new topics, post new articles,
				create new users, vote for articles, leave comments on articles, change
				your avatar, and much more soon!
				<br />
				<br />
				Thanks for visiting!
			</h2>
		</main>
	);
};

export default Home;
