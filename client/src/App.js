import React from 'react';
import {Container} from 'react-bootstrap'

import ApolloProvider from './ApolloProvider'

import './App.scss';
import Register from './pages/Register'

function App() {
  return (
    <ApolloProvider>
    <Container className="p-5">
      <Register />
    </Container>
    </ApolloProvider>
  );
}

export default App;
