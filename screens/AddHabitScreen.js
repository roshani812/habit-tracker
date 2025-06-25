import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addHabit } from '../redux/habitSlice';

export default function AddHabitScreen({ navigation }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const habits = useSelector(state => state.habit.habits);

  const handleAdd = async () => {
    if (!name.trim()) return;
    const newHabit = { id: uuid.v4(), name, completed: false };
    const updatedHabits = [...habits, newHabit];
    dispatch(addHabit(newHabit));
    await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Habit Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Add Habit" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
