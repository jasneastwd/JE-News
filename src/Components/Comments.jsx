import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsById } from '../Utils/api';
import { Link } from 'react-router-dom';

const Comments = () => {
	const params = useParams();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getCommentsById(params.article_id).then((commentsFromApi) => {
			setComments(commentsFromApi);
		});
	}, [params.article_id]);
	return (
		<div>
			<main>
				<h2>Previous Article Comments</h2>
				<ul className='each-comment'>
					{comments.map(({ author, body, votes, created_at, comment_id }) => {
						return (
							<li key={comment_id} className='comments-list'>
								<h3>Author: {author}</h3>
								<p>Comment: {body}</p>
								<p>Date posted: {created_at}</p>
								<p>Votes: {votes}</p>
								<Link to={`/articles/${params.article_id}`}>
									<button className='myButton'>Back to article</button>
								</Link>
								<button className='myButton'>⬆️ Votes</button>

								<button className='myButton'>⬇️ Votes</button>
							</li>
						);
					})}
				</ul>
			</main>
		</div>
	);
};

export default Comments;
