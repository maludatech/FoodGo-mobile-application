import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AddItem = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>AddItem</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
