import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Accounts from './Components/Accounts.jsx';
import Article from './Components/Article.jsx';
import Articles from './Components/Articles.jsx';
import Comments from './Components/Comments.jsx';
import Home from './Components/Home.jsx';
import Nav from './Components/Nav.jsx';
import Topics from './Components/Topics.jsx';
import Account from './Components/Account.jsx';
import Post from './Components/Post.jsx';
// import { UserProvider } from './contexts/user.jsx';
// import RequireLogin from './Components/RequireLogin.jsx';
// import UserProfile from './Components/UserProfile.jsx';

function App() {
	return (
		<div className='App'>
			<Header />
			<Nav />
			<Switch>
				{/* <UserProvider> */}
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
					<Post />
					<Comments />
				</Route>

				{/* <RequireLogin> */}
				<Route exact path='/users'>
					{/* <UserProfile /> */}
					<Accounts />
				</Route>
				<Route exact path='/users/:username'>
					<Account />
				</Route>
				{/* </RequireLogin>
				</UserProvider> */}
			</Switch>
		</div>
	);
}

export default App;
