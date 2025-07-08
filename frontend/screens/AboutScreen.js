import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>💫</Text>
      <Text style={styles.title}>AI Wisdom Mentor</Text>
      <Text style={styles.subtitle}>Your pocket-sized guide to clarity & comfort.</Text>

      <Text style={styles.sectionHeader}>🌟 What This App Does</Text>
      <Text style={styles.paragraph}>
        AI Wisdom Mentor offers emotionally intelligent and compassionate guidance
        through the power of AI. Whether you're feeling lost, demotivated, or just need
        perspective, ask your question and receive a personalized response — in a tone
        you choose.
      </Text>

      <Text style={styles.sectionHeader}>🧠 Key Features</Text>
      <Text style={styles.paragraph}>• Select tone: Motivational, Spiritual, Calm, and more</Text>
      <Text style={styles.paragraph}>• Fast, empathetic responses powered by LLMs</Text>
      <Text style={styles.paragraph}>• Favorite and revisit past responses (coming soon)</Text>

      <Text style={styles.sectionHeader}>🚀 Built With</Text>
      <Text style={styles.paragraph}>
        React Native · FastAPI · OpenRouter API · Mistral 7B · Emotional Prompt Templates
      </Text>

      <Text style={styles.footer}>Made with ❤️ to guide your thoughts.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  paragraph: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
    lineHeight: 22,
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
