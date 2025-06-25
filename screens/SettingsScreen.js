import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setHabits } from '../redux/habitSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();

  const handleReset = async () => {
    await AsyncStorage.removeItem('habits');
    dispatch(setHabits([]));
    Alert.alert('Reset', 'All habits cleared');
  };

  return (
    <View style={styles.container}>
      <Button title="Reset All Data" color="red" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#fff' 
  },
});
