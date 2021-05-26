import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../Utils/api';
import { Link } from 'react-router-dom';
import Votes from '../Components/Votes.jsx';

const Article = () => {
	const params = useParams();
	const [article, setArticle] = useState({});

	useEffect(() => {
		getArticleById(params.article_id).then((articleFromApi) => {
			setArticle(articleFromApi);
		});
	}, [params.article_id]);
	return (
		<main className='individual-article'>
			<Link to={`/articles`}>
				<button className='myButton'>Back to Articles</button>
			</Link>
			<h2>{article.title}</h2>
			<p> {article.body}</p>
			<p>Author: {article.author}</p>
			<p>Created at: {article.created_at}</p>
			<p>Topic: {article.topic}</p>
			<Votes votes={article.votes} username={article.article_id} />
			<Link to={`/articles/${article.article_id}/comments`}>
				<button className='myButton'>Read Comments</button>
			</Link>
		</main>
	);
};

/* <h2>{article.title}</h2>
<p> {article.body}</p>
<p>Author: {article.author}</p>
<p>Created at: {article.created_at}</p>
<p>Votes: {article.votes}</p>
<p>Topic: {article.topic}</p> */

export default Article;
