import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      {/* This is preferable if you want the title to access data - else add in the layout Stack */}
      <Stack.Screen options={{ title: `Details for ${id}` }} />

      <Text>ProductDetails for id: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
