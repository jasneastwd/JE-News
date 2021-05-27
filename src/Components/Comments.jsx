import { useEffect, useState } from 'react';
import { getCommentsById, deleteCommentById } from '../Utils/api';
import { useParams, useHistory } from 'react-router-dom';

import Votes from '../Components/Votes.jsx';

const Comments = () => {
	const history = useHistory();
	const params = useParams();
	const [comments, setComments] = useState([]);
	const [commentDeleted, setCommentDeleted] = useState(false);

	useEffect(() => {
		getCommentsById(params.article_id).then((commentsFromApi) => {
			setComments(commentsFromApi);
		});
	}, [params.article_id]);

	const deleteComment = (comment_id) => {
		const article_id = params.article_id;
		deleteCommentById(article_id, comment_id).then(() => {
			setCommentDeleted(true);
			alert('Comment deleted (not really yet)');
		});
	};
	if (commentDeleted) {
		history.push(`/articles/${params.article_id}`);
	}

	return (
		<main>
			<h2>Previous Article Comments</h2>
			<button
				className='myButton'
				onClick={() => {
					return history.push(`/articles/${params.article_id}`);
				}}
			>
				Back to Article
			</button>
			<ul className='each-comment'>
				{comments.map(({ author, body, votes, created_at, comment_id }) => {
					return (
						<li key={comment_id} className='comments-list'>
							<h3>Author: {author}</h3>

							<p>Comment: {body}</p>
							<p>Date posted: {created_at}</p>

							<Votes votes={votes} username={comment_id} />
							<button
								className='myButton-delete'
								onClick={() => {
									deleteComment(comment_id);
								}}
							>
								Delete Comment
							</button>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default Comments;
