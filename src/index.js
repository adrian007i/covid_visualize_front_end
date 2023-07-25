import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
 
const client = new ApolloClient({
  uri: "https://covid-visualizer.onrender.com/graphql/",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> 
      <App />
    </ApolloProvider>,
  </React.StrictMode>

); 
reportWebVitals();
