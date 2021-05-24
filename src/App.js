import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Accounts from './Components/Accounts.jsx';
import Article from './Components/Article.jsx';
import Articles from './Components/Articles.jsx';
import Home from './Components/Home.jsx';
import Nav from './Components/Nav.jsx';
import Topics from './Components/Topics.jsx';

function App() {
	return (
		<div className='App'>
			<Header />
			<Nav />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/articles'>
					<Articles />
				</Route>
				<Route exact path='/topics'>
					<Topics />
				</Route>
				<Route exact path='/users'>
					<Accounts />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
