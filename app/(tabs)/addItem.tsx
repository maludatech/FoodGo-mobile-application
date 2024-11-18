import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const addItem = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>addItem</Text>
      </View>
    </SafeAreaView>
  );
};

export default addItem;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
