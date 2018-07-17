import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game numSquare ={9} />, document.getElementById('root'));
registerServiceWorker();
