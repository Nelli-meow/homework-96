import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import { GOOGLE_CLIENT_ID } from './globalConstants.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer/>
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  </GoogleOAuthProvider>
);
