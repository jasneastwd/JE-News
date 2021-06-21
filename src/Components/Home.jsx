import React, { useContext } from 'react';
import { UserContext } from '../contexts/User';
import Box from '@material-ui/core/Box';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <h1>Welcome back {user.username} </h1>
      <section className="outer-article">
        <section className="article-body">
          <h2>Welcome to JE-News! </h2>This is my first full-stack project!{' '}
          <br />
          <br /> This is my first project which took approximately 10 days to
          build during my time at{' '}
          <a href="https://northcoders.com">NorthCoders</a>.
          <br />
          <br />
          Feel free to have a look around: post new topics, post new articles,
          create new users, vote for articles, leave comments on articles,
          change your avatar, and much more soon!
          <br />
          <br />
          Thanks for visiting!
        </section>
      </section>
    </Box>
  );
};

export default Home;
