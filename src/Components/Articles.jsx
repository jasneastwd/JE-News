import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../Utils/api';

const Articles = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		getArticles().then((articlesFromApi) => {
			setArticles(articlesFromApi);
		});
	}, []);

	return (
		<main className='Articles'>
			<h2>All Articles</h2>
			<ul className='each-article'>
				{articles.map(
					({ article_id, title, body, topic, author, created_at }) => {
						return (
							<li key={article_id} className='articles-list'>
								<Link to={`/articles/${article_id}`}>
									<h3>{title}</h3>
								</Link>
								<p>{body}</p>
								<Link to={`/topics/${topic}`}>
									<p>Topic: {topic}</p>
								</Link>
								<p>Author: {author}</p>
								<p>Posted: {created_at}</p>
							</li>
						);
					}
				)}
			</ul>
		</main>
	);
};

export default Articles;
