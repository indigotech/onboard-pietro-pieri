/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import client from "./apollo/apolloclient";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BlankPage from "./components/blankpage";

const Stack = createStackNavigator();

const AppWithNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="App"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="BlankPage" component={BlankPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

const AppApollo = () => (
  <ApolloProvider client={client}>
    <AppWithNavigation />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppApollo);
