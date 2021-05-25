import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user';

const Login = () => {
	const { setUser } = useContext(UserContext);
	const [username, setUsername] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault(setUser({ username }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='username'>Username:</label>
			<input
				type='text'
				id='username'
				value={username}
				onChange={(e) => {
					setUsername(e.target.value);
				}}
			/>
			<button>Log in</button>
		</form>
	);
};

export default Login;
