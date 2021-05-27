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
	const [submitted, setSubmitted] = useState(false);
	useEffect(() => {
		getTopics().then((topicsFromApi) => {
			setTopics(topicsFromApi);
		});
	}, []);

	const addTopic = (e) => {
		e.preventDefault();
		postTopic(newTopic).then(() => {
			setSubmitted(true);
			alert('topic posted!');
			setTopics(emptyTopic);
		});
	};
	if (submitted) {
		history.push(`/`);
	}

	return (
		<main className='Topics'>
			<div className='post-topic-form'>
				<h2>Post a Topic:</h2>
				<form onSubmit={addTopic}>
					<label htmlFor='topic-slug'>Topic: </label>
					<input
						type='text'
						name='topic-slug'
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
					<label htmlFor='topic-description'>Body: </label>
					<input
						type='text'
						name='topic-description'
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
					<button>Post topic!</button>
				</form>
			</div>
			<h2>All Topics</h2>

			<ul className='each-topic'>
				{topics.map(({ slug, description }) => {
					return (
						<li key={slug} className='topics-list'>
							<h2>
								<Link to={`/articles?topic=${slug}`}>{slug}</Link>
							</h2>
							<p>About: {description}</p>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default Topics;
