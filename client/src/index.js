import React from 'react';
import ReactDOM from 'react-dom';
import fontawesome from '@fortawesome/fontawesome'

import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';
import icons from './utils/font-awesome';

fontawesome.library.add(...icons);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
