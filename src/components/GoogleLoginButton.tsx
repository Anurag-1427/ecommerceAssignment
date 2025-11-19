import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = { title?: string; onPress: () => void };

export default function GoogleButton({ title = 'Sign in with Google', onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text>Google</Text>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: 20, height: 20, marginRight: 10 },
  text: { fontSize: 16 },
});
