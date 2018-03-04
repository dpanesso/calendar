// @flow
import React from 'react';
import WebFont from 'webfontloader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import storeFactory from './store';
import sampleData from './store/initialState.json';
import App from './components/containers/App';
import './styles/index.css';

WebFont.load({
  google: {
    families: ['Lato', 'sans-serif'],
  },
});

const muiTheme = getMuiTheme({
  fontFamily: 'Lato, sans-serif',
});

const store = storeFactory(sampleData);

window.React = React;
window.store = store;

const root = document.getElementById('root');
if (root != null) {
  render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    (document.getElementById('root'): any), // prevent flow weird warning
  );
} else {
  throw new Error('Cannot find root element in index.html');
}

registerServiceWorker();
