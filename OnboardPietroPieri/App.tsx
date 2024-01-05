/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <View style={styles.center}>
      <Text>"Hello word"</Text>
    </View>
  );
};

export default App;
