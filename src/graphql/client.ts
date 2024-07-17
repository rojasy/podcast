import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://youtube-golang-podcast.onrender.com/query',
  cache: new InMemoryCache(),
});
