/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { client } from "./apollo/apolloclient";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const AppApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppApollo);
