import { supabase } from '@/src/lib/supabase';
import { View, Text, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;
