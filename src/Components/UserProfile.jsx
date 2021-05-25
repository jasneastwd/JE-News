import { useContext } from 'react';
import { UserContext } from '../contexts/user';

const UserProfile = () => {
	const { user } = useContext(UserContext);
	return (
		<div>
			<h2>Hello {user.username}</h2>
		</div>
	);
};

export default UserProfile;
