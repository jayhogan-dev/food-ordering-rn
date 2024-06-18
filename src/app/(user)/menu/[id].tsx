import { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { useProduct } from '@/src/api/products';

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
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? 'black' : 'gray' },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>{product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
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
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 'auto', // push to bottom
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
