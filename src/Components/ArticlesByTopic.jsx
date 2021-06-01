import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getArticles, postArticle, getArticlesByTopic } from '../Utils/api';
import Votes from '../Components/Votes.jsx';
import { UserContext } from '../contexts/User';
import { TopicContext } from '../contexts/Topic';

const Articles = () => {
	const history = useHistory();
	const { user } = useContext(UserContext);
	const { topics } = useContext(TopicContext);
	const location = useLocation();
	const [articles, setArticles] = useState([]);
	const emptyArticle = {
		topic: '',
		title: '',
		body: '',
		author: `${user.username}`,
	};
	const [newArticle, setNewArticle] = useState(emptyArticle);
	const [sortOrder, setSortOrder] = useState('ASC');
	const [sortProperty, setSortProperty] = useState('title');
	const [filter, setFilter] = useState('');
	let query = location.search.slice(7);

	useEffect(() => {
		if (query) {
			console.log(query);
			setFilter(query);
			console.log(filter);
			getArticles(filter).then((articles) => {
				setArticles(articles);
			});
		} else if (filter === 'show-all') {
			getArticles({ sortOrder, sortProperty }).then((articles) => {
				setArticles(articles);
			});
		} else {
			getArticlesByTopic({ filter, sortOrder, sortProperty }).then(
				(articles) => {
					setArticles(articles);
				}
			);
		}
	}, [setArticles, sortOrder, sortProperty, filter, query]);

	const addArticle = (e) => {
		e.preventDefault();
		postArticle(newArticle).then(() => {
			<alert> article posted!</alert>;
			setNewArticle(emptyArticle);
			history.push(`/articles`);
		});
	};

	return (
		<main className='Articles'>
			<div className='post-article-form'>
				<h2 className='article-form-headings'>Post an Article:</h2>
				<form onSubmit={addArticle}>
					<label htmlFor='article-topic' className='post-article-label'>
						Topic:{' '}
					</label>
					<select
						className='select-post-box'
						type='text'
						id='article-topic'
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
					>
						{topics.map(({ slug }) => {
							return (
								<option value={slug} key={slug}>
									{slug}
								</option>
							);
						})}
					</select>
					<br />
					<label htmlFor='article-title' className='post-article-label'>
						Title:{' '}
					</label>
					<input
						className='post-box'
						type='text'
						id='article-title'
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
					<label htmlFor='article-body' className='post-article-label'>
						Body:{' '}
					</label>
					<textarea
						rows='5'
						className='post-box-bigger'
						type='text'
						id='article-body'
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
					></textarea>
					<br />
					<button className='myButton'>Post article</button>
				</form>
			</div>

			<div className='select-dropdowns'>
				<h2>All Articles</h2>
				<form>
					<label>Filter by: </label>
					<select
						className='dropdown'
						value={filter}
						onChange={(event) => {
							setFilter(event.target.value);
						}}
					>
						{topics.map(({ slug }) => {
							return (
								<option value={slug} key={slug}>
									{slug}
								</option>
							);
						})}
					</select>
				</form>
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
				<br />
				<button className='myButton-arrows' onClick={() => setSortOrder('ASC')}>
					⬆
				</button>
				<button
					className='myButton-arrows'
					onClick={() => setSortOrder('DESC')}
				>
					⬇
				</button>
			</div>
			<ul className='each-article'>
				{articles.map(({ article_id, title, topic, created_at, votes }) => {
					return (
						<li key={article_id} className='articles-list'>
							<Link to={`/articles/${article_id}`}>
								<h3>{title}</h3>
							</Link>

							<Link to={`/articles?topic=${topic}`}>
								<p>Topic: {topic} </p>
							</Link>
							<p>Posted: {created_at}</p>
							<Votes votes={votes} username={article_id} />
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default Articles;
