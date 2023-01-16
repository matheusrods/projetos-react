import React from 'react';
import ReactDOM from 'react-dom';
import 'swiper/swiper-bundle.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
// import mocks from './mocks';

// import './config/ReactotronConfig.js';

// if (process.env.REACT_APP_MOCK_ADAPTER === 'true') mocks();
// if (process.env.NODE_ENV !== 'production') console.log('>>>>>>', process.env);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
