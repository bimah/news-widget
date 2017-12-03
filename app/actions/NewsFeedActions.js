import Alt from '../alt';

const NewsFeedActions = Alt.generateActions(
  'fetchNews',
  'setFeeds',
  'handleError',
);

export default Alt.createActions(NewsFeedActions);
