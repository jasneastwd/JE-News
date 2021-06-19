import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getArticles, postArticle, getArticlesByTopic } from '../Utils/api';
import Votes from '../Components/Votes.jsx';
import { UserContext } from '../contexts/User';
import { TopicContext } from '../contexts/Topic';
import Popup from 'reactjs-popup';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Articles = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { topics } = useContext(TopicContext);
  const [articles, setArticles] = useState([]);
  const emptyArticle = {
    topic: '',
    title: '',
    body: '',
    author: `${user.username}`,
  };
  const [newArticle, setNewArticle] = useState(emptyArticle);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [sortProperty, setSortProperty] = useState('title');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter === 'show-all') {
      getArticles({ sortOrder, sortProperty }).then((articles) => {
        setArticles(articles);
      });
    } else {
      getArticlesByTopic({ filter, sortOrder, sortProperty }).then(
        (articles) => {
          setArticles(articles);
        },
      );
    }
  }, [setArticles, sortOrder, sortProperty, filter]);

  const addArticle = (e) => {
    e.preventDefault();
    postArticle(newArticle).then(() => {
      <Popup />;
      setNewArticle(emptyArticle);
      history.push(`/articles`);
    });
  };

  return (
    <main className="Articles">
      <div className="select-dropdowns">
        <h2>All Articles</h2>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter by: </InputLabel>
          <Select
            className="select-box-2"
            variant="filled"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            required
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          >
            {topics.map(({ slug }) => {
              return (
                <option value={slug} key={slug}>
                  {slug}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <p>
          Sorted by: {sortProperty}{' '}
          {sortOrder === 'ASC' ? 'Ascending' : 'Descending'}
        </p>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setSortProperty('title')}
        >
          Title
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setSortProperty('topic')}
        >
          Topic
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setSortProperty('votes')}
        >
          Votes
        </Button>
        <br />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setSortOrder('ASC')}
        >
          ⬆
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setSortOrder('DESC')}
        >
          ⬇
        </Button>
      </div>
      <ul className="each-article row">
        {articles.map(({ article_id, title, topic, created_at, votes }) => {
          return (
            <li key={article_id} className="articles-list column">
              <Link to={`/articles/${article_id}`}>
                <h3>{title}</h3>
              </Link>

              <Link to={`/articles?topic=${topic}`}>
                <p>Topic: {topic} </p>
              </Link>
              <p>Posted: {created_at}</p>
              <Votes votes={votes} username={article_id} />
            </li>
          );
        })}
      </ul>
      <div className="post-article-form">
        <h2 className="article-form-headings">Post an Article:</h2>
        <FormControl onSubmit={addArticle}>
          <InputLabel id="demo-simple-select-label">Topic: </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            required
            value={newArticle.topic}
            onChange={(e) => {
              setNewArticle((emptyArticle) => {
                return {
                  ...emptyArticle,
                  topic: e.target.value,
                };
              });
            }}
          >
            {topics.map(({ slug }) => {
              return (
                <MenuItem value={slug} key={slug}>
                  {slug}
                </MenuItem>
              );
            })}
          </Select>

          <Textfield
            id="filled-basic-1"
            label="Title"
            variant="filled"
            required
            value={newArticle.title}
            onChange={(e) => {
              setNewArticle((emptyArticle) => {
                return {
                  ...emptyArticle,
                  title: e.target.value,
                };
              });
            }}
          ></Textfield>

          <Textfield
            id="filled-basic-2"
            label="Write your article here"
            variant="filled"
            rows="5"
            type="text"
            required
            value={newArticle.body}
            onChange={(e) => {
              setNewArticle((emptyArticle) => {
                return {
                  ...emptyArticle,
                  body: e.target.value,
                };
              });
            }}
          ></Textfield>
          <br />
          <Button color="primary" variant="outlined">
            Post article
          </Button>
        </FormControl>
      </div>
    </main>
  );
};

export default Articles;
