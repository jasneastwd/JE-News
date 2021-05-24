import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../Utils/api';

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
			<h2>{article.title}</h2>
			<p> {article.body}</p>
			<p>Author: {article.author}</p>
			<p>Created at: {article.created_at}</p>
			<p>Votes: {article.votes}</p>
			<p>Topic: {article.topic}</p>
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
