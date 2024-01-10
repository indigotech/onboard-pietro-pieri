/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { LoginPage } from "./components/login-page";
import { client } from "./apollo/apolloclient";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BlankPage } from "./components/blank-page";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator
            initialRouteName="LoginPage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="BlankPage" component={BlankPage} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 80,
    flex: 1,
  },
});

export default App;
