import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ProductList } from "@/components/ProductList";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Query = () => {
  const query = useLocalSearchParams();
  console.log(query.query);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#EF2A39" style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text>Query</Text>
          <Text>{query.query}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Query;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
