import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from '@apollo/client';

// https://www.apollographql.com/docs/react/networking/authentication/#header
const link = createHttpLink({
  uri: process.env.REACT_APP_HASURA_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([link]),
});

export default client;
