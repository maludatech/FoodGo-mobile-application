import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ProductList } from "@/components/ProductList";
import { SafeAreaView } from "react-native-safe-area-context";

const query = () => {
  const query = useLocalSearchParams();
  console.log(query.query);
  return (
    <SafeAreaView>
      <View>
        <Text>query</Text>
      </View>
    </SafeAreaView>
  );
};

export default query;
