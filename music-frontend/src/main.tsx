import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store';
import {ToastContainer} from 'react-toastify';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axiosApi';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from './constants';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContainer position="bottom-right" />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
