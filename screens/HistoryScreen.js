// HistoryScreen.js
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function HistoryScreen() {
  const habits = useSelector(state => state.habit.habits);
  const completed = habits.filter(h => h.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Habits</Text>
      <FlatList
        data={completed}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 18,
  },
});
