import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';

const enhancer = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, enhancer);


ReactDOM.render(<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));
registerServiceWorker();
