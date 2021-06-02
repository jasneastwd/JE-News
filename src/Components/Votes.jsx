import * as api from '../Utils/api';
import { useState } from 'react';
import Button from '@material-ui/core/Button';

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
	const decDisabled = votesChange < 0;

	return (
		<section>
			<p>Votes: {votes + votesChange}</p>
			<Button
				disabled={incDisabled}
				onClick={incVotes}
				color='primary'
				variant='outlined'
			>
				⬆ Votes
			</Button>
			<Button
				disabled={decDisabled}
				onClick={decVotes}
				color='primary'
				variant='outlined'
			>
				⬇ Votes
			</Button>
		</section>
	);
};

export default Votes;
