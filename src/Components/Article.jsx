import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getArticleById, postComment, deleteArticleById } from '../Utils/api';
import Votes from '../Components/Votes.jsx';
import { UserContext } from '../contexts/User';

const Article = () => {
	const history = useHistory();
	const { user } = useContext(UserContext);

	const params = useParams();
	const [article, setArticle] = useState({});

	const emptyComment = {
		article_id: `${params.article_id}`,
		author: `${user.username}`,
		body: '',
	};
	const [comment, setComment] = useState(emptyComment);
	const [submitted, setSubmitted] = useState(false);
	const [articleDeleted, setArticleDeleted] = useState(false);

	useEffect(() => {
		getArticleById(params.article_id).then((articleFromApi) => {
			setArticle(articleFromApi);
		});
	}, [params.article_id]);

	const addComment = (e) => {
		e.preventDefault();
		postComment(comment).then(() => {
			setSubmitted(true);
			alert('comment posted!');
			setComment(emptyComment);
		});
	};
	if (submitted) {
		history.push(`/articles/${article.article_id}/comments`);
	}

	const deleteArticle = (article) => {
		const id = article.article_id;
		deleteArticleById(id).then(() => {
			setArticleDeleted(true);
			alert('Article deleted');
		});
	};
	if (articleDeleted) {
		history.push(`/articles`);
	}

	return (
		<>
			<main className='individual-article'>
				<Link to={`/articles`}>
					<button className='myButton'>Back to Articles</button>
				</Link>
				<button
					className='myButton-delete'
					onClick={() => {
						deleteArticle(article);
					}}
				>
					Delete Article
				</button>
				<section className='outer-article'>
					<section className='article-body'>
						<h2>{article.title}</h2>
						<p> {article.body}</p>
						<p>Author: {article.author}</p>
						<p>Created at: {article.created_at}</p>
						<p>Topic: {article.topic}</p>
						<Votes votes={article.votes} username={article.article_id} />
						<Link to={`/articles/${article.article_id}/comments`}>
							<button className='myButton'>Read Comments</button>
						</Link>
					</section>
				</section>
			</main>
			<div>
				<div className='post-comment-form'>
					<form onSubmit={addComment}>
						<label htmlFor='comment-body'>Leave a comment: </label>
						<input
							type='text'
							name='comment-body'
							value={comment.body}
							required
							onChange={(e) => {
								setComment((comment) => {
									return {
										...comment,
										body: e.target.value,
									};
								});
							}}
						></input>
						<br />
						<button className='myButton'>Post!</button>
					</form>
				</div>
			</div>
		</>
	);
};

/* <h2>{article.title}</h2>
<p> {article.body}</p>
<p>Author: {article.author}</p>
<p>Created at: {article.created_at}</p>
<p>Votes: {article.votes}</p>
<p>Topic: {article.topic}</p> */

export default Article;
