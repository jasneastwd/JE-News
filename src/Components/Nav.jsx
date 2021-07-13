import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

const Nav = () => {
  const { user } = useContext(UserContext);
  const links = [
    {
      id: 1,
      url: '/JE-News',
      text: 'Home',
    },
    {
      id: 2,
      url: '/topics',
      text: 'Topics',
    },
    {
      id: 3,
      url: '/articles',
      text: 'Articles',
    },
    {
      id: 4,
      url: '/Users',
      text: 'Users',
    },
    {
      id: 5,
      url: `/Users/${user.username}`,
      text: 'Profile',
    },
  ];

  return (
    <div className='links-container'>
      <ul className='links'>
        {links.map((link) => {
          const { id, url, text } = link;
          return (
            <li key={id}>
              <a href={url}>{text}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
