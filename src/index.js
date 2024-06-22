import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import store from './Components/Store/index';
import store  from './Components/Store/index'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
  <GoogleOAuthProvider clientId="226241707219-nuheouj3in1phae2esi0tdm956c0k5tf.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
  </>
);
