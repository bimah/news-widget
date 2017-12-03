import Alt from '../../alt';
import NewsFeedSource from '../../sources/NewsFeedSource';
import NewsFeedActions from '../../actions/NewsFeedActions';
import MockData from '../MockData/mockNewsFeed.json';
import config from '../../config';

Alt.dispatcher.dispatch = jest.fn().mockImplementation(Alt.dispatcher.dispatch);

const mockState = {
  feeds: null,
  loading: true,
  error: false,
};

class MockNewsFeedStore {
  constructor() {
    this.state = mockState;
    this.bindActions(NewsFeedActions);
    this.registerAsync(NewsFeedSource);
  }
}

const mockNewsFeedStore = Alt.createStore(MockNewsFeedStore, 'MockNewsFeedStore');

describe('NewsFeedSource', () => {
  describe('`getTopHeadlines` action', () => {
    it('should fetch the correct endpoint and correct parameters', (done) => {
      fetch.mockResponseOnce(JSON.stringify(MockData));

      mockNewsFeedStore.getTopHeadlines().then(() => {
        const mockUrl = fetch.mock.calls[0][0].split('?');
        const endpoint = mockUrl[0];
        const parameters = mockUrl[1].split('&');

        const serviceURL = 'https://newsapi.org/v2';
        const apiEndpoint = 'top-headlines';
        const URL = `${serviceURL}/${apiEndpoint}`;
        expect(endpoint).toEqual(URL);
        expect(parameters).toEqual(expect.arrayContaining([
          `apiKey=${config.apiKey}`,
          `language=${config.language}`,
        ]));
        done();
      });
    });
  });
});
