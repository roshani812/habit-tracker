import { createSlice } from '@reduxjs/toolkit';

export const habitSlice = createSlice({
  name: 'habit',
  initialState: {
    habits: [],
  },
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    toggleHabit: (state, action) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    loadHabits: (state, action) => {
      state.habits = action.payload;
    },
  },
});

export const { addHabit, toggleHabit, loadHabits } = habitSlice.actions;
export default habitSlice.reducer;
