import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Support = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>Support</Text>
      </View>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
