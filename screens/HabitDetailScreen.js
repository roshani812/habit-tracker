import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { markHabitDone } from '../redux/habitSlice';

export default function HabitDetailScreen({ route, navigation }) {
  const { habit } = route.params;
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habit.habits);

  const handleMarkDone = async () => {
    dispatch(markHabitDone(habit.id));
    const updated = habits.map((h) =>
      h.id === habit.id ? { ...h, completed: true } : h
    );
    await AsyncStorage.setItem('habits', JSON.stringify(updated));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{habit.name}</Text>
      <Text style={styles.status}>
        Status: {habit.completed ? '✅ Completed' : '❌ Incomplete'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Mark as Done" onPress={handleMarkDone} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('EditHabit', { habit })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 5,
  },
});
