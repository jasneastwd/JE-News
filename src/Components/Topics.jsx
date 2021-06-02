import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTopics, postTopic } from '../Utils/api';
import Button from '@material-ui/core/Button';

const Topics = () => {
	const history = useHistory();
	const emptyTopic = {
		slug: '',
		description: '',
	};
	const [topics, setTopics] = useState([]);
	const [newTopic, setNewTopic] = useState(emptyTopic);
	const [sortOrder, setSortOrder] = useState('ASC');

	useEffect(() => {
		getTopics(sortOrder).then((topicsFromApi) => {
			setTopics(topicsFromApi);
		});
	}, [sortOrder]);

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
						<Button color='primary' variant='outlined'>
							Post topic
						</Button>
					</form>
				</div>
				<h2>All Topics</h2>
				<p>
					Sorted by: Topics {sortOrder === 'ASC' ? 'Ascending' : 'Descending'}
				</p>
				<Button
					color='primary'
					variant='outlined'
					onClick={() => setSortOrder('ASC')}
				>
					Topics: A-Z
				</Button>
				<Button
					color='primary'
					variant='outlined'
					onClick={() => setSortOrder('DESC')}
				>
					Topics: Z-A
				</Button>
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
