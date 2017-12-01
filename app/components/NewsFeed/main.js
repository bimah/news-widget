import React from 'react';
import styles from './main.scss';
import DropDown from '../DropDown/main';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsSources: [
        {
          value: 'all',
          label: 'Filter By Source',
        },
        {
          value: 'bbc',
          label: 'BBC',
        },
      ],
      news: [
        {
          source: {
            id: 'bbc-news',
            name: 'BBC News',
          },
          author: 'BBC News',
          title: 'Flynn charged for \'making false statement\'',
          description: 'Trump\'s ex-national security adviser Michael Flynn charged with making false statement to FBI in January',
          url: 'http://www.bbc.co.uk/news/world-us-canada-42192080',
          urlToImage: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/7A23/production/_97176213_breaking_news_bigger.png',
          publishedAt: '2017-12-01T14:18:35Z',
        },
      ],
    };

    this.filterSource = this.filterSource.bind(this);
    this.loadMoreNews = this.loadMoreNews.bind(this);
  }

  filterSource(filter) {
    console.log(`filter: ${filter}`);
  }

  loadMoreNews() {
    console.log('load more');
  }

  formattedDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`;
  }

  render() {
    const { newsSources, news } = this.state;
    return (
      <div className={styles['news-feed']}>
        <div className={styles['news-feed__header']}>
          <h2>News</h2>
          <div className={styles.filter}>
            <DropDown onChange={this.filterSource} options={newsSources} />
          </div>
        </div>
        <div className={styles['news-feed__body']}>
          {news.map(newsItem => (
            <div className={styles['feed-item']} key={newsItem.publishedAt}>
              <h3>
                <a href={newsItem.url} title={newsItem.title}>
                  {newsItem.title}
                </a>
              </h3>
              <div className={styles['feed-item__details']}>
                <p className={styles.date}>{this.formattedDate(newsItem.publishedAt)}</p>
                <p className={styles.source}>{newsItem.source.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['news-feed__actions']}>
          <button onClick={this.loadMoreNews}>Show More</button>
        </div>
      </div>
    );
  }
}

export default NewsFeed;
