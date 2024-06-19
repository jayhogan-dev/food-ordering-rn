import { useState } from 'react';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/src/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();

  if (idString === undefined) {
    return null;
  }

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <View style={styles.container}>
      {/* This is preferable if you want the title to access data - else add in the layout Stack */}
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={24}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />

      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>{product?.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, // take entire screen
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
