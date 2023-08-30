// Container component
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://moladibari.stepzen.net/api/LinkedIn/__graphql',
  headers: {'Authorization':'apikey moladibari::stepzen.io+1000::5908f553bcfe342a9fd3124f99f15d3e367966e079836b83d59033a259fc30bc'},
  cache: new InMemoryCache(),
});

export default client;