import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({color}:{color:string}) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="small" color={color} />
  </View>
);

export default Spinner;
