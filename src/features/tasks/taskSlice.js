import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const selectTasks = (state) => state.task.value;

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.value = action.payload;
    },
    addTask: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    updateTask: (state, action) => {
      state.value = state.value.map((task) => {
        if (task.id !== action.payload.id) return task;
        return action.payload;
      });
    },
    removeTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
