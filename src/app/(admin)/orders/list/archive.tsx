import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { StyleSheet, FlatList } from 'react-native';

const ArchiveScreen = () => {
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
