import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {
    Button,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadHabits, toggleHabit } from '../redux/habitSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const habits = useSelector(state => state.habit.habits);

  useEffect(() => {
    const fetchHabits = async () => {
      const storedHabits = await AsyncStorage.getItem('habits');
      if (storedHabits) {
        dispatch(loadHabits(JSON.parse(storedHabits)));
      }
    };
    fetchHabits();
  }, []);

  const handleToggle = async (id) => {
    dispatch(toggleHabit(id));
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return (
    <View style={styles.container}>
      <Button title="Add Habit" onPress={() => navigation.navigate('AddHabit')} />

      {habits.length === 0 ? (
        <Text style={styles.emptyText}>No habits found. Add one!</Text>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.habitItem,
                item.completed && styles.completedHabit,
              ]}
              onPress={() => handleToggle(item.id)}
            >
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  habitItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    elevation: 3,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    } : {})
  },
  completedHabit: {
    backgroundColor: '#d4edda',
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  }
});
