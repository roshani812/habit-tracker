import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
  const habits = useSelector(state => state.habit.habits);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Total Habits: {habits.length}</Text>
      <Text>Completed: {habits.filter(h => h.completed).length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
