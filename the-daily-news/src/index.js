import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { Provider } from 'react-redux';
import ReduxStore from './store';
import AppRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);