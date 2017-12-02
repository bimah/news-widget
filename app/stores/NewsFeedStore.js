import Alt from '../alt';
import Actions from '../actions/NewsFeedActions';
import Source from '../sources/NewsFeedSource';

class NewsFeedStore {
  constructor() {
    this.state = {
      feeds: null,
      loading: true,
      error: false,
    };

    this.bindActions(Actions);
  }

  fail(message) {
    this.setState({
      feeds: null,
      loading: false,
      error: message,
    });
  }

  setFeed(data) {
    this.setState({
      feeds: data,
      loading: false,
      error: false,
    });
  }

  onFetchNews() {
    Source.getTopHeadlines()
      .then((result) => {
        if (!result) {
          this.fail('requestError');
          throw new Error(`${result.status} - Couldn't fetch news`);
        }
        return result;
      })
      .then(result => result.json())
      .then((result) => {
        if (!result || result.status !== 'ok') {
          this.fail(result.message);
          throw new Error(`${result.status} - ${result.message}`);
        }
        this.setFeed(result.articles);
      });
  }
}

export default Alt.createStore(NewsFeedStore);
