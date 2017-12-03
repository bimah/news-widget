import React from 'react';
import PropTypes from 'prop-types';
import styles from './main.scss';
import DropDown from '../DropDown/main';

import Actions from '../../actions/NewsFeedActions';
import Store from '../../stores/NewsFeedStore';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsSources: null,
      news: null,
      loading: true,
      error: false,
      loadMore: 0,
      filtered: null,
    };

    this.filterSource = this.filterSource.bind(this);
    this.loadMoreNews = this.loadMoreNews.bind(this);
    this.onNewsStoreChange = this.onNewsStoreChange.bind(this);
  }

  componentDidMount() {
    Actions.fetchNews();
    Store.listen(this.onNewsStoreChange);
  }

  componentWillUnmount() {
    Store.unlisten(this.onNewsStoreChange);
  }

  onNewsStoreChange({ feeds, loading, error }) {
    const { filterLabel } = this.props;

    const filters = [{ label: filterLabel, value: '' }];
    if (feeds) {
      feeds.forEach((feed) => {
        if (!filters.filter(item => item.value === feed.source.id).length) {
          filters.push({ label: feed.source.name, value: feed.source.id });
        }
      });
    }

    this.setState({
      news: feeds,
      newsSources: filters,
      loading,
      error,
    });
  }

  filterSource(filtered) {
    this.setState({
      filtered,
    });
  }

  loadMoreNews() {
    const { loadMore } = this.state;
    this.setState({
      loadMore: loadMore + 1,
    });
  }

  formattedDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`;
  }

  render() {
    const {
      newsSources,
      news,
      loading,
      error,
      loadMore,
      filtered,
    } = this.state;
    const { feedsToShow } = this.props;

    let feedToLoad = null;
    let filteredNews = null;
    const numberOfNews = feedsToShow + (feedsToShow * loadMore);

    if (news) {
      filteredNews = filtered ? news.filter(item => item.source.id === filtered) : news;
      feedToLoad = filteredNews && filteredNews.slice(0, numberOfNews);
    }

    return (
      <div className={styles['news-feed']}>
        <div className={styles['news-feed__header']}>
          <h2>News</h2>
          {newsSources &&
            <div className={styles.filter}>
              <DropDown onChange={this.filterSource} options={newsSources} />
            </div>
          }
        </div>
        <div className={styles['news-feed__body']}>
          {feedToLoad && feedToLoad.map(newsItem => (
            <div className={styles['feed-item']} key={`${newsItem.source.id}-${newsItem.title}`}>
              <h3>
                <a href={newsItem.url} title={newsItem.title} target="_blank">
                  {newsItem.title}
                </a>
              </h3>
              <div className={styles['feed-item__details']}>
                <p className={styles.date}>{this.formattedDate(newsItem.publishedAt)}</p>
                <p className={styles.source}>{newsItem.source.name}</p>
              </div>
            </div>
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
        {feedToLoad && numberOfNews <= news.length &&
          <div className={styles['news-feed__actions']}>
            <button onClick={this.loadMoreNews}>Show More</button>
          </div>}
      </div>
    );
  }
}

NewsFeed.defaultProps = {
  feedsToShow: 5,
  filterLabel: 'Filter By Source',
};

NewsFeed.propTypes = {
  feedsToShow: PropTypes.number,
  filterLabel: PropTypes.string,
};

export default NewsFeed;
