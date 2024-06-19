import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      {/* A View doesn't have an onPress event so replace with Pressable */}
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain" // add this to make sure the aspect ratio is maintained and shows the entire image (default is cover which crops the image)
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%', // add this if you have 2 columns and don't want an odd number to take up the whole row
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
