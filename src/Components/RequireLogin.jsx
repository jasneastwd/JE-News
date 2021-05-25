import { useContext } from 'react';
import { UserContext } from '../contexts/user';
import Login from './Login';

const RequireLogin = ({ children }) => {
	const { isUserLoggedIn } = useContext(UserContext);

	return isUserLoggedIn ? children : <Login />;
};

export default RequireLogin;
