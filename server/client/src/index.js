import React from 'react';
import ReactDOM from 'react-dom';
import 'react-quill/dist/quill.snow.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
