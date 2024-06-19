import orders from '@/assets/data/orders';
import { useOrderDetails } from '@/src/api/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();

  if (idString === undefined) {
    return null;
  }

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch order details</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      {/* (*) If the FlatList is like this, the order list item will stay at the top... and essentially, not scroll */}
      {/* <OrderListItem order={order} /> */}

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={<OrderListItem order={order} />}
      />

      {/* If that's not what you want (*), add ListHeaderComponent to the flatlist and pass the OrderList Item */}
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
});
