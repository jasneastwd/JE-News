import axios from 'axios';

const newsApi = axios.create({
	baseURL: 'https://jasneastwd-nc-news.herokuapp.com/api',
});

export const getArticles = async () => {
	const { data } = await newsApi.get('/articles');
	return data.articles;
};
export const getTopics = async () => {
	const { data } = await newsApi.get('/topics');
	return data.topics;
};
