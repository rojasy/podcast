import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ListenNowScreen from '../components/listenNow/ListenNowScreen.tsx';
import SearchScreen from '../components/search/SearchScreen.tsx';
import LibraryScreen from '../components/library/LibraryScreen.tsx';

const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now',
        }}
        name="ListenNow"
        component={ListenNowScreen}></ListenNowStack.Screen>
    </ListenNowStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}></LibraryStack.Screen>
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator screenOptions={{headerShown: false}}>
      <MainTab.Screen
        options={{title: 'Listen Now'}}
        name="ListenNow"
        component={ListenNowStackNavigator}></MainTab.Screen>

      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}></MainTab.Screen>

      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}></MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
