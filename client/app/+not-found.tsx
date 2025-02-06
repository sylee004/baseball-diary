import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { mainStyles } from '@/styles/main.style'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={mainStyles.container}>
        <Text style={mainStyles.title}>This screen doesn't exist!!!!</Text>
        {/*<Link href={`/`} style={mainStyles.link}>*/}
        {/*  <Text style={mainStyles.linkText}>Go to home screen!</Text>*/}
        {/*</Link>*/}
      </View>
    </>
  );
}
