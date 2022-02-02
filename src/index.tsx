import React from 'react';
import ReactDOM from 'react-dom';
import './theme/index.css';
import reportWebVitals from './reportWebVitals';
import { Home } from './components/pages/Home';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
