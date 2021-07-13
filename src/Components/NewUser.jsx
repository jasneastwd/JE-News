import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Textfield from '@material-ui/core/TextField';
import * as api from '../Utils/api';

const NewUser = () => {
  const [showInfo, setShowInfo] = useState(false);
  const history = useHistory();
  const emptyUser = {
    username: ``,
    name: ``,
    avatar_url: ``,
  };
  const [newUser, setNewUser] = useState(emptyUser);

  const addUser = (e) => {
    e.preventDefault();
    api.postUser(newUser).then(() => {
      alert('user added!');
      setNewUser(emptyUser);
      history.push(`/Users`);
    });
  };
  return (
    <section className='post-user-form'>
      <h2>Create a user:</h2>
      <form onSubmit={addUser}>
        <Textfield
          id='filled-basic'
          label='Username'
          variant='filled'
          value={newUser.username}
          required
          onChange={(e) => {
            setNewUser((emptyUser) => {
              return {
                ...emptyUser,
                username: e.target.value,
              };
            });
          }}
        ></Textfield>
        <br />

        <Textfield
          id='filled-basic'
          label='Full Name'
          variant='filled'
          value={newUser.name}
          required
          onChange={(e) => {
            setNewUser((emptyUser) => {
              return {
                ...emptyUser,
                name: e.target.value,
              };
            });
          }}
        ></Textfield>
        <br />
        <Textfield
          id='filled-basic'
          label='Avatar URL'
          variant='filled'
          value={newUser.avatar_url}
          required
          placeholder='Paste URL here'
          onChange={(e) => {
            setNewUser((emptyUser) => {
              return {
                ...emptyUser,
                avatar_url: e.target.value,
              };
            });
          }}
        ></Textfield>
        <br />
        <Button color='primary' variant='outlined'>
          Create User
        </Button>
      </form>
    </section>
  );
};

export default NewUser;
