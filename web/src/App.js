import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer
            autoClose={3000}
            transition={Zoom}
            toastClassName="toast-container"
            progressClassName="toast-progressbar"
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
