import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import * as api from '../Utils/api';
import NewUser from './NewUser';

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const emptyUser = {
    username: ``,
    name: ``,
    avatar_url: ``,
  };
  const [newUser, setNewUser] = useState(emptyUser);

  useEffect(() => {
    api.getUsers().then((usersFromApi) => {
      setUsers(usersFromApi);
    });
  }, [newUser]);

  const logIn = (user) => {
    setUser(user);
    history.push(`/`);
  };
  return (
    <div className='Users'>
      <NewUser />

      <h2 className='section-heading'>Existing users:</h2>
      <ul className='each-user row'>
        {users.map((user) => {
          return (
            <Paper key={user.username} className='users-list column'>
              <h4>Username: {user.username}</h4>
              <Avatar src={user.avatar_url} alt={user.username}></Avatar>
              <Button
                color='primary'
                variant='outlined'
                onClick={() => logIn(user)}
              >
                Choose User
              </Button>
            </Paper>
          );
        })}
      </ul>
    </div>
  );
};

export default Accounts;
