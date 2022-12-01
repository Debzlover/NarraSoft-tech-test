import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import toolsDragDropSlice from './index/dragToolsSlice';

export const store = configureStore({
  reducer: {
    dragNDrop: toolsDragDropSlice
  },
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
