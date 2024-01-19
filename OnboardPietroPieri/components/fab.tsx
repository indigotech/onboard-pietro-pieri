import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

interface FABButtonProps {
  onPress: () => void;
}

export const FAB: React.FC<FABButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fabContainer} onPress={onPress}>
      <View style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  fab: {
    backgroundColor: "#2196F3",
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
