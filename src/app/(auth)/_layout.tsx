import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthStack() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Stack />;
}
