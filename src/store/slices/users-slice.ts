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
            const users = action.payload.map((item) => {
                const newUser = { ...item }
                state.users.forEach((oldUser) => {
                    if (oldUser.id === newUser.id)
                        newUser.muted = oldUser.muted
                })
                return newUser
            })

            state.users = users
        },
        muteUser(state, action: PayloadAction<string>) {
            state.users.forEach((user) => {
                if (user.id === action.payload)
                    user.muted = !user.muted
            })
        }
    }
})

export const selectUsers = (state: RootState) => state.users.users

export const usersReducer = usersSlice.reducer
export const { updateUsers, muteUser } = usersSlice.actions