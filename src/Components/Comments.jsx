import { useEffect, useState, useContext } from 'react';
import { getCommentsById, postComment } from '../Utils/api';
import { Link, Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import Votes from '../Components/Votes.jsx';

const Comments = () => {
	const emptyComment = {
		article_id: '',
		author: '',
		body: '',
	};
	const params = useParams();
	const [comments, setComments] = useState([]);
	const { user } = useContext(UserContext);
	const [newComment, setNewComment] = useState(emptyComment);
	const [submitted, setSubmitted] = useState(false);
	// >>>>>>
	useEffect(() => {
		getCommentsById(params.article_id).then((commentsFromApi) => {
			setComments(commentsFromApi);
		});
	}, [params.article_id]);
	//SOMETHING HERE NOT WORKING, WEB PAGE STATIC
	const handleSubmit = (e) => {
		e.preventDefault();
		postComment(newComment).then((comment) => {
			console.log(comment);
			setSubmitted(true);
			alert('You have commented!');
			setComments(emptyComment);
		});
	};
	if (submitted) {
		return <Redirect to={`/articles`} />;
	}

	return (
		<div>
			<div className='post-comment-form'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='comment-body'>Leave a comment: </label>
					<input
						type='text'
						name='comment-body'
						value={newComment.body}
						required
						onChange={(e) => {
							setNewComment((comments) => {
								return {
									...comments,
									body: e.target.value,
									author: user.username,
									article_id: params.article_id,
								};
							});
						}}
					></input>
					<br />
				</form>
				<button>Post!</button>
			</div>
			<main>
				<h2>Previous Article Comments</h2>
				<ul className='each-comment'>
					{comments.map(({ author, body, votes, created_at, comment_id }) => {
						return (
							<li key={comment_id} className='comments-list'>
								<Link to={`/articles/${params.article_id}`}>
									<button className='myButton'>Back to article</button>
								</Link>
								<h3>Author: {author}</h3>
								<p>Comment: {body}</p>
								<p>Date posted: {created_at}</p>
								<Votes votes={votes} username={comment_id} />
							</li>
						);
					})}
				</ul>
			</main>
		</div>
	);
};

export default Comments;
