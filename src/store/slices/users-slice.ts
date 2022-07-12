import { IUser } from './../../types/user';
import { RootState } from './../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UsersState {
    users: IUser[]
}

const initialState: UsersState = {
    users: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUsers(state, action: PayloadAction<IUser[]>) {
            state.users = action.payload
        }
    }
})

export const selectUsers = (state: RootState) => state.users.users

export const usersReducer = usersSlice.reducer
export const { updateUsers } = usersSlice.actions