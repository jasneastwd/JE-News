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
			<h2>All Topics</h2>
			<ul className='each-topic'>
				{topics.map(({ slug, description }) => {
					return (
						<li key={slug} className='topics-list'>
							<h2>
								<Link to={`/topics/${slug}`}>{slug}</Link>
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
