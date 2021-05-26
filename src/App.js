import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Nav from './Components/Nav.jsx';
import Home from './Components/Home.jsx';
import Topics from './Components/Topics.jsx';
import Articles from './Components/Articles.jsx';
import Article from './Components/Article.jsx';
import Comments from './Components/Comments.jsx';

import Accounts from './Components/Accounts.jsx';
import Account from './Components/Account.jsx';
import { useState } from 'react';
import { UserContext } from './contexts/User';

function App() {
	const [user, setUser] = useState({
		username: 'guest',
		avatar_url:
			'https://images.macrumors.com/t/CynyMmV320sxD-tHY9kdnlFNnBc=/400x0/filters:quality(90)/article-new/2019/04/guest-user-250x250.jpg?lossy',
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<div className='App'>
				<Header />
				<Nav />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/topics'>
						<Topics />
					</Route>
					<Route exact path='/articles'>
						<Articles />
					</Route>
					<Route exact path='/articles/:article_id'>
						<Article />
					</Route>
					<Route exact path='/articles/:article_id/comments'>
						<Comments />
					</Route>
					<Route exact path='/users'>
						<Accounts />
					</Route>
					<Route exact path='/users/:username'>
						<Account />
					</Route>
				</Switch>
			</div>
		</UserContext.Provider>
	);
}

export default App;
