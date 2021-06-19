import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getArticleById, postComment, deleteArticleById } from '../Utils/api';
import Votes from '../Components/Votes.jsx';
import { UserContext } from '../contexts/User';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Article = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const params = useParams();
  const [article, setArticle] = useState({});

  const emptyComment = {
    article_id: `${params.article_id}`,
    author: `${user.username}`,
    body: '',
  };
  const [comment, setComment] = useState(emptyComment);

  const [articleDeleted, setArticleDeleted] = useState(false);

  useEffect(() => {
    getArticleById(params.article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
    });
  }, [params.article_id]);

  const addComment = (e) => {
    e.preventDefault();
    postComment(comment).then(() => {
      alert('comment posted!');
      setComment(emptyComment);
      history.push(`/articles/${article.article_id}/comments`);
    });
  };

  const deleteArticle = (article) => {
    const id = article.article_id;
    deleteArticleById(id).then(() => {
      setArticleDeleted(true);
      alert('Article deleted');
    });
  };
  if (articleDeleted) {
    history.push(`/articles`);
  }

  return (
    <>
      <Box className="individual-article">
        <section className="outer-article">
          <section className="article-body">
            <h2>{article.title}</h2>

            <p> {article.body}</p>
            <p>Author: {article.author}</p>
            <p>Created at: {article.created_at}</p>
            <p>Topic: {article.topic}</p>
            <Votes votes={article.votes} username={article.article_id} />
            <Link to={`/articles`}>
              <Button color="primary" variant="outlined">
                Back to Articles
              </Button>
            </Link>
            <Link to={`/articles/${article.article_id}/comments`}>
              <Button color="primary" variant="outlined">
                Read Comments
              </Button>
            </Link>
          </section>
        </section>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            deleteArticle(article);
          }}
        >
          Delete Article
        </Button>
      </Box>
      <div>
        <div className="post-comment-form">
          <form onSubmit={addComment}>
            <label htmlFor="comment-body" className="comment-box-label">
              Leave a comment:{' '}
            </label>
            <textarea
              rows="4"
              type="text"
              id="comment-body"
              className="post-box-comment"
              value={comment.body}
              required
              onChange={(e) => {
                setComment((comment) => {
                  return {
                    ...comment,
                    body: e.target.value,
                  };
                });
              }}
            ></textarea>
            <br />
            <Button color="primary" variant="outlined">
              Post
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

/* <h2>{article.title}</h2>
<p> {article.body}</p>
<p>Author: {article.author}</p>
<p>Created at: {article.created_at}</p>
<p>Votes: {article.votes}</p>
<p>Topic: {article.topic}</p> */

export default Article;
