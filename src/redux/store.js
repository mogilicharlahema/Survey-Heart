// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todosSlice';
// import { loadState, saveState } from './localStorage';
import { loadState,saveState } from '../localStorage';

// Load persisted state from local storage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: persistedState, // Preload state with persisted state
});

// Save state to local storage whenever the state changes
store.subscribe(() => {
  saveState(store.getState());
});
