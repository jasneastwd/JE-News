import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const isUserLoggedIn = !!user.username;

	return (
		<UserContext.Provider value={{ user, setUser, isUserLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};
