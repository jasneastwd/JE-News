import React from 'react';

const Post = () => {
	return (
		<div>
			<h2>Post a comment:</h2>
			<form>
				<label>User: </label>
				<input placeholder='username from state'></input>
				<br />
				<label>Topic: </label>
				<input placeholder='state topics dropdown'></input>
				<br />
				<label>Article Title: </label>
				<input></input>
				<br />
				<label>Body: </label>
				<input></input>
				<br />
			</form>
			<button>Post comment</button>
		</div>
	);
};

export default Post;
