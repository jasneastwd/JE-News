import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getArticles, postArticle } from '../Utils/api';
import Votes from '../Components/Votes.jsx';
import { UserContext } from '../contexts/User';

const Articles = () => {
	const history = useHistory();
	const { user } = useContext(UserContext);
	const [articles, setArticles] = useState([]);
	const emptyArticle = {
		topic: '',
		title: '',
		body: '',
		author: `${user.username}`,
	};
	const [newArticle, setNewArticle] = useState(emptyArticle);
	const [submitted, setSubmitted] = useState(false);
	const [sortOrder, setSortOrder] = useState('ASC');
	const [sortProperty, setSortProperty] = useState('title');

	useEffect(() => {
		getArticles({ sortOrder, sortProperty }).then((articles) => {
			setArticles(articles);
		});
	}, [setArticles, sortOrder, sortProperty]);

	const addArticle = (e) => {
		e.preventDefault();
		postArticle(newArticle).then(() => {
			setSubmitted(true);
			alert('article posted!');
			setNewArticle(emptyArticle);
		});
	};
	if (submitted) {
		history.push(`/articles`);
	}

	return (
		<main className='Articles'>
			<div className='post-article-form'>
				<h2>Post an Article:</h2>
				<form onSubmit={addArticle}>
					<label htmlFor='article-topic'>Topic: </label>
					<input
						type='text'
						name='article-topic'
						required
						value={newArticle.topic}
						onChange={(e) => {
							setNewArticle((emptyArticle) => {
								return {
									...emptyArticle,
									topic: e.target.value,
								};
							});
						}}
					></input>
					<br />
					<label htmlFor='article-title'>Article Title: </label>
					<input
						type='text'
						name='article-title'
						required
						value={newArticle.title}
						onChange={(e) => {
							setNewArticle((emptyArticle) => {
								return {
									...emptyArticle,
									title: e.target.value,
								};
							});
						}}
					></input>
					<br />
					<label htmlFor='article-body'>Body: </label>
					<input
						type='text'
						name='article-body'
						required
						value={newArticle.body}
						onChange={(e) => {
							setNewArticle((emptyArticle) => {
								return {
									...emptyArticle,
									body: e.target.value,
								};
							});
						}}
					></input>
					<br />
					<button className='myButton'>Post article!!</button>
				</form>
			</div>

			<div className='select-dropdowns'>
				<h2>All Articles</h2>
				<p>
					Sorted by: {sortProperty}{' '}
					{sortOrder === 'ASC' ? 'Ascending' : 'Descending'}
				</p>
				<button className='myButton' onClick={() => setSortProperty('title')}>
					Title
				</button>
				<button className='myButton' onClick={() => setSortProperty('topic')}>
					Topic
				</button>
				<button className='myButton' onClick={() => setSortProperty('votes')}>
					Votes
				</button>
				<button className='myButton' onClick={() => setSortOrder('ASC')}>
					Ascending
				</button>
				<button className='myButton' onClick={() => setSortOrder('DESC')}>
					Descending
				</button>
				{/* <form>
					<label className='select-label'>Filter:</label>
					<select className='select-field'>
						<option value='show-all'>Show All</option>
						<option value='coding'>Coding</option>
						<option value='football'>Football</option>
						<option value='cooking'>Cooking</option>
					</select>
				</form> */}

				{/* <form>
					<label className='select-label'>Order by:</label>
					<select className='select-field'>
						<option value='title'>Title</option>
						<option value='votes'>Votes</option>
						<option value='created_at'>Date</option>
					</select>
				</form> */}
			</div>

			<ul className='each-article'>
				{articles.map(
					({ article_id, title, body, topic, created_at, votes }) => {
						return (
							<li key={article_id} className='articles-list'>
								<Link to={`/articles/${article_id}`}>
									<h3>{title}</h3>
								</Link>

								<Link to={`/articles?${topic}`}>
									<p>Topic: {topic}</p>
								</Link>
								<p>Posted: {created_at}</p>
								<Votes votes={votes} username={article_id} />
							</li>
						);
					}
				)}
			</ul>
		</main>
	);
};

export default Articles;

// const [topic, setTopic] = useState('');

// useEffect(() => {
// 	if (topic === 'show-all') {
// 		getArticles().then((articles) => {
// 			setArticles(articles);
// 		});
// 	} else {
// 		getArticlesByTopic(topic).then((articles) => {
// 			setArticles(articles);
// 		});
// 	}
// }, [setArticles, topic]);

// value={topic}
// 					onChange={(e) => {
// 						setTopic(e.target.value);
// 					}}
