import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './slices/authSlice'
import gameReducer from './slices/gameSlice'
import webUrlReducer from './slices/webUrlSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        game: gameReducer,
        webUrl: webUrlReducer,
    },
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = () => useDispatch()
