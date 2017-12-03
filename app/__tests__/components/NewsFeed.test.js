import React from 'react';
import { shallow } from 'enzyme';
// import NewsFeedSource from '../../sources/NewsFeedSource';
// import NewsFeedActions from '../../actions/NewsFeedActions';
import NewsFeed from '../../components/NewsFeed/main';
import mockFeed from '../MockData/mockNewsFeed.json';

const mockState = {
  news: mockFeed.articles,
  loading: false,
  loadMore: 0,
};

describe('NewsFeed component', () => {
  it('should initiate with `Loading` message', () => {
    const newsFeed = shallow(<NewsFeed />);

    expect(newsFeed.find('.news-feed__body').getElement().props.children[1].props.children).toEqual('Loading...');
  });

  it('should display 5 news', () => {
    const newsFeed = shallow(<NewsFeed />);
    newsFeed.setState(mockState);

    expect(newsFeed.find('.news-feed__body').getElement().props.children[0].length).toEqual(5);
  });

  it('should display 10 news', () => {
    const newsFeed = shallow(<NewsFeed />);
    newsFeed.setState(mockState);
    newsFeed.find('button').simulate('click');

    expect(newsFeed.find('.news-feed__body').getElement().props.children[0].length).toEqual(10);
  });

  it('changing `feedToShow` will display the correct amount of news', () => {
    const newsFeed = shallow(<NewsFeed feedsToShow={3} />);
    newsFeed.setState(mockState);
    newsFeed.find('button').simulate('click');

    expect(newsFeed.find('.news-feed__body').getElement().props.children[0].length).toEqual(6);
  });

  it('should display error', () => {
    const newsFeed = shallow(<NewsFeed />);
    newsFeed.setState({
      error: 'error',
    });

    expect(newsFeed.find('.news-feed__body').getElement().props.children[2].props.children).toEqual('error');
  });
});
