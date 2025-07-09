// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// export default function TonePicker({ tones, selectedTone, onToneChange }) {
//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
//       {tones.map((tone) => (
//         <TouchableOpacity
//           key={tone.value}
//           style={[
//             styles.toneCard,
//             selectedTone === tone.value && styles.selectedCard,
//           ]}
//           onPress={() => onToneChange(tone.value)}
//         >
//           <Text style={styles.emoji}>{tone.emoji}</Text>
//           <Text style={styles.label}>{tone.label}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scroll: { marginBottom: 15 },
//   toneCard: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 90,
//     height: 90,
//     marginRight: 12,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 16,
//     padding: 8,
//   },
//   selectedCard: {
//     backgroundColor: '#007AFF',
//   },
//   emoji: {
//     fontSize: 24,
//   },
//   label: {
//     marginTop: 4,
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#333',
//   },
// });
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

export default function TonePicker({ tones, selectedTone, onToneChange }) {
  if (!tones || tones.length === 0) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.toneCard,
        selectedTone === item.value && styles.selectedCard,
      ]}
      onPress={() => onToneChange(item.value)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tones}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
      numColumns={2}
      columnWrapperStyle={styles.row}
      scrollEnabled={false}
      contentContainerStyle={{ paddingBottom: 15 }}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  toneCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 6,
    width: Dimensions.get('window').width / 2 - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    backgroundColor: '#007AFF',
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});
