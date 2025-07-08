import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';

export default function ResponseScreen({ route }) {
  const { wisdom } = route.params;
  const navigation = useNavigation();

  const [typedText, setTypedText] = useState('');
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Floating animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Typing animation
  useEffect(() => {
    let currentText = '';
    let i = 0;

    const interval = setInterval(() => {
      if (i < wisdom.length) {
        currentText += wisdom[i];
        setTypedText(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // typing speed

    return () => clearInterval(interval);
  }, [wisdom]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wisdom</Text>

      <Animated.View style={[styles.card, { transform: [{ translateY: floatAnim }] }]}>
        <Text style={styles.typed}>{typedText}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Ask Another</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, marginBottom: 30, fontWeight: 'bold', alignSelf: 'center' },

  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 30,
  },

  typed: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 28,
  },

  backButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },

  backText: {
    color: '#fff',
    fontSize: 16,
  },
});
