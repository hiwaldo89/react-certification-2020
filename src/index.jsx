import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import 'normalize.css';
import 'typeface-tinos';
import 'typeface-lato';
import './global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
