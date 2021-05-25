import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../Utils/api';

const Topics = () => {
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		getTopics().then((topicsFromApi) => {
			setTopics(topicsFromApi);
		});
	}, []);
	return (
		<main className='Topics'>
			<div className='post-topic-form'>
				<h2>Post a Topic:</h2>
				<form>
					<label>Topic: </label>
					<input placeholder='state topics dropdown'></input>
					<br />
					<label>Body: </label>
					<input></input>
					<br />
				</form>
				<button>Post topic!</button>
			</div>
			<h2>All Topics</h2>

			<ul className='each-topic'>
				{topics.map(({ slug, description }) => {
					return (
						<li key={slug} className='topics-list'>
							<h2>
								<Link to={`/articles?${slug}`}>{slug}</Link>
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
