import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHabit, editHabit } from '../redux/habitSlice';

export default function EditHabitScreen({ route, navigation }) {
  const { habit } = route.params;
  const [name, setName] = useState(habit.name);
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habit.habits);

  const handleEdit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Habit name cannot be empty');
      return;
    }
    const updated = habits.map((h) =>
      h.id === habit.id ? { ...habit, name } : h
    );
    dispatch(editHabit({ ...habit, name }));
    await AsyncStorage.setItem('habits', JSON.stringify(updated));
    navigation.goBack();
  };

  const handleDelete = async () => {
    const updated = habits.filter((h) => h.id !== habit.id);
    dispatch(deleteHabit(habit.id));
    await AsyncStorage.setItem('habits', JSON.stringify(updated));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Edit habit name"
        style={styles.input}
      />
      <View style={styles.button}>
        <Button title="Save" onPress={handleEdit} />
      </View>
      <View style={styles.button}>
        <Button title="Delete" onPress={handleDelete} color="red" />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  button: {
    marginVertical: 5,
  },
});
