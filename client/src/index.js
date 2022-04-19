import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import "./index.css";
import ChatProvider from "./Context/ChatProvider";
ReactDOM.render(
  // <Provider store={store}>
  // <React.StrictMode>
  <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  // </Provider>,
  document.getElementById("root")
);
