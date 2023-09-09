// Container component
import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from '@apollo/client';

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      postPaginatedList: {
        keyArgs: false, //when we are sending the same query, this variable should be stored uniquely 
                        // type: array of variable ex) ['id'], [], false
                        //in this case, its variables are first and after, and treated as a single list, not objects 
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        }
      }
    }
  }
}

const client = new ApolloClient({
  uri: 'https://moladibari.stepzen.net/api/LinkedIn/__graphql',
  headers: {'Authorization':'apikey moladibari::stepzen.io+1000::5908f553bcfe342a9fd3124f99f15d3e367966e079836b83d59033a259fc30bc'},
  cache: new InMemoryCache({ typePolicies }),
});

export default client;