import * as api from '../Utils/api';
import { useState } from 'react';

const Votes = ({ votes, username }) => {
	const [votesChange, setVotesChange] = useState(0);

	const incVotes = () => {
		setVotesChange((currVotes) => currVotes + 1);
		api.patchArticleVotes(username, 1).catch(() => {
			setVotesChange(0);
		});
	};

	const decVotes = () => {
		setVotesChange((currVotes) => currVotes - 1);
		api.patchArticleVotes(username, -1).catch(() => {
			setVotesChange(0);
		});
	};

	const incDisabled = votesChange > 0;
	// NEED TO FIGURE OUT HOW TO DISABLE DOWN VOTE BUTTON

	return (
		<section>
			<p>Votes: {votes + votesChange}</p>
			<button disabled={incDisabled} onClick={incVotes} className='myButton'>
				⬆️ Votes
			</button>
			<button onClick={decVotes} className='myButton'>
				⬇️ Votes
			</button>
		</section>
	);
};

export default Votes;
