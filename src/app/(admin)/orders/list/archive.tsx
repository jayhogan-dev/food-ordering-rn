import orders from '@/assets/data/orders';
import { useAdminOrderList } from '@/src/api/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';

const ArchiveScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });

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

export default ArchiveScreen;

const styles = StyleSheet.create({});
