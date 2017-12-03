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
    this.registerAsync(Source);
  }

  onHandleError(data) {
    this.setState({
      feeds: null,
      loading: false,
      error: data.message,
    });
  }

  onSetFeeds(data) {
    this.setState({
      feeds: data.articles,
      loading: false,
      error: false,
    });
  }

  onFetchNews() {
    if (!this.getInstance().isLoading()) {
      this.getInstance().getTopHeadlines();
    }
  }
}

export default Alt.createStore(NewsFeedStore, 'NewsFeedStore');
