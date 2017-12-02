import 'whatwg-fetch';
import config from '../config';

const serviceURL = 'https://newsapi.org/v2';

const NewsFeedSource = {
  getTopHeadlines: () => {
    const apiEndpoint = 'top-headlines';
    const URL = `${serviceURL}/${apiEndpoint}?language=${config.language}&country=${config.country}&apiKey=${config.apiKey}`;

    return fetch(URL);
  },
};

export default NewsFeedSource;
