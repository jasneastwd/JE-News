import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTopics, postTopic } from '../Utils/api';

const Topics = () => {
	const history = useHistory();
	const emptyTopic = {
		slug: '',
		description: '',
	};
	const [topics, setTopics] = useState([]);
	const [newTopic, setNewTopic] = useState(emptyTopic);

	useEffect(() => {
		getTopics().then((topicsFromApi) => {
			setTopics(topicsFromApi);
		});
	}, []);

	const addTopic = (e) => {
		e.preventDefault();
		postTopic(newTopic).then(() => {
			alert('topic posted!');
			setTopics(emptyTopic);
			history.push(`/`);
		});
	};

	return (
		<div className='main-area'>
			<main className='Topics'>
				<div className='post-topic-form'>
					<h2>Post a Topic:</h2>
					<form onSubmit={addTopic}>
						<label htmlFor='topic-slug' className='post-user-label'>
							Topic:{' '}
						</label>
						<input
							className='post-box'
							type='text'
							id='topic-slug'
							value={newTopic.slug}
							required
							onChange={(e) => {
								setNewTopic((topic) => {
									return {
										...topic,
										slug: e.target.value,
									};
								});
							}}
						></input>
						<br />
						<label className='post-user-label ' htmlFor='topic-description'>
							Body:{' '}
						</label>
						<input
							className='post-box-big'
							type='text'
							id='topic-description'
							value={newTopic.description}
							required
							onChange={(e) => {
								setNewTopic((topic) => {
									return {
										...topic,
										description: e.target.value,
									};
								});
							}}
						></input>
						<br />
						<button className='myButton'>Post topic</button>
					</form>
				</div>
				<h2>All Topics</h2>

				<ul className='each-topic'>
					{topics.map(({ slug, description }) => {
						return (
							<li key={slug} className='topics-list'>
								<h3>
									<Link to={`/articles?topic=${slug}`}>{slug}</Link>
								</h3>
								<p>About: {description}</p>
							</li>
						);
					})}
				</ul>
			</main>
		</div>
	);
};

export default Topics;
