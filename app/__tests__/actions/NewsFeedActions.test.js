import NewsFeedActions from '../../actions/NewsFeedActions';

describe('NewsFeedActions', () => {
  it('should have the `fetchNews` action', () => {
    expect(NewsFeedActions.fetchNews).toBeDefined();
  });
});
