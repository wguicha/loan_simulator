// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import loanReducer from './loanSlice';

export const store = configureStore({
    reducer: {
        loan: loanReducer,
    },
});

// Tipos derivados del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
