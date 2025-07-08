import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getWisdom, getToneOptions ,analyzeEmotion} from '../lib/api';
import TonePicker from '../components/TonePicker';
import { Switch } from 'react-native';

const emotionToTone = {
  sad: 'spiritual',
  frustrated: 'calm',
  confused: 'wise',
  hopeful: 'motivational',
  anxious: 'comforting',
  happy: 'inspirational',
};

export default function HomeScreen({ navigation }) {
  const [question, setQuestion] = useState('');
  const [tone, setTone] = useState('');
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(false);
const [autoDetectTone, setAutoDetectTone] = useState(true);


  useEffect(() => {
    const fetchTones = async () => {
      const res = await getToneOptions();
      setTones(res);
      if (res.length > 0) setTone(res[0].value);
    };
    fetchTones();
  }, []);


useEffect(() => {
  if (!autoDetectTone) return;

  const timeout = setTimeout(() => {
    if (question.trim()) handleAutoDetectTone();
  }, 1000);

  return () => clearTimeout(timeout);
}, [question, autoDetectTone]);


  const handleAutoDetectTone = async () => {
    try {
      const result = await analyzeEmotion(question);
      const detected = emotionToTone[result.emotion] || 'wise';
      setTone(detected);
    } catch (err) {
      console.log("Tone detection error", err);
    }
  };


  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const wisdom = await getWisdom(question, tone);
      navigation.navigate('Response', { wisdom });
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s on your mind?</Text>
      <TextInput
        placeholder="Ask your question..."
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        multiline
      />

            <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Auto Detect Tone</Text>
        <Switch value={autoDetectTone} onValueChange={setAutoDetectTone} />
      </View>

      {autoDetectTone && tone && (
        <Text style={styles.detectedTone}>Detected Tone: {tone}</Text>
      )}

      {!autoDetectTone && (
        <TonePicker tones={tones} selectedTone={tone} onToneChange={setTone} />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.askButton} onPress={handleAsk}>
          <Text style={styles.askButtonText}>Ask Wisdom</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 80,
    marginBottom: 20,
  },
   toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  detectedTone: {
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#555',
  },
  askButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  askButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
