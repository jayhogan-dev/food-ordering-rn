import orders from '@/assets/data/orders';
import { useMyOrderList } from '@/src/api/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
