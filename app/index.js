import React from 'react';
import ReactDOM from 'react-dom';
import styles from './main.scss';

const App = () => (<div className={styles.main}>Hello there</div>);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
