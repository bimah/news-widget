import 'whatwg-fetch';
import 'babel-core/register';
import NewsFeedActions from '../actions/NewsFeedActions';
import config from '../config';

const serviceURL = 'https://newsapi.org/v2';

const NewsFeedSource = {
  getTopHeadlines: {
    remote: () => {
      const apiEndpoint = 'top-headlines';
      const URL = `${serviceURL}/${apiEndpoint}?language=${config.language}&country=${config.country}&apiKey=${config.apiKey}`;

      return fetch(URL).then(res => res.json());
    },
    success: NewsFeedActions.setFeeds,
    error: NewsFeedActions.handleError,
  },
};

export default NewsFeedSource;
