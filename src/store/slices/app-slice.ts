import { RootState } from './../index';
import { IUser } from './../../types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    user: IUser
}

const initialState: AppState = {
    user: {
        id: '',
        name: '',
        avatar: -1
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        }
    }
})

export const selectUser = (state: RootState) => state.app.user

export const appReducer = appSlice.reducer
export const { updateUser } = appSlice.actions