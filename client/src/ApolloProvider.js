import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider as Provider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://localhost:4000',
  cache: new InMemoryCache()
});

export default function ApolloProvider(props){
  return <Provider client={client} {...props} />;
}
