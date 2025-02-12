import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './slices/authSlice'
import webUrlReducer from './slices/webUrlSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        webUrl: webUrlReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = () => useDispatch()
