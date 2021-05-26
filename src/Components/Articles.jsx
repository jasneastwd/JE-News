import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../Utils/api';
import Votes from '../Components/Votes.jsx';

const Articles = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		getArticles().then((articles) => {
			setArticles(articles);
		});
	}, [setArticles]);

	return (
		<main className='Articles'>
			<div className='post-article-form'>
				<h2>Post an Article:</h2>
				<form>
					<label>Topic: </label>
					<input placeholder='state topics dropdown'></input>
					<br />
					<label>Article Title: </label>
					<input placeholder='free text'></input>
					<br />
					<label>Body: </label>
					<input></input>
					<br />
					<label>Author: </label>
					<input placeholder='user username'></input>
					<br />
				</form>
				<button>Post topic!</button>
			</div>
			<div className='select-dropdowns'>
				<h2>All Articles</h2>
				<form>
					<label className='select-label'>Filter:</label>
					<select className='select-field'>
						<option value='show-all'>Show All</option>
						<option value='coding'>Coding</option>
						<option value='football'>Football</option>
						<option value='cooking'>Cooking</option>
					</select>
				</form>

				<form>
					<label className='select-label'>Order by:</label>
					<select className='select-field'>
						<option value='title'>Title</option>
						<option value='votes'>Votes</option>
						<option value='created_at'>Date</option>
					</select>
				</form>
			</div>
			<ul className='each-article'>
				{articles.map(
					({ article_id, title, body, topic, created_at, votes }) => {
						return (
							<li key={article_id} className='articles-list'>
								<Link to={`/articles/${article_id}`}>
									<h3>{title}</h3>
								</Link>
								<p>{body}</p>
								<Link to={`/topics/${topic}`}>
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
