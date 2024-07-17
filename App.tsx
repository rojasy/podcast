import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/client.ts';

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
