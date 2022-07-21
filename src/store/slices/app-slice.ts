import { RootState } from './../index';
import { IUser } from './../../types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    user: IUser;
    emojiPanel: boolean;
}

const initialState: AppState = {
    user: {
        id: '',
        name: '',
        avatar: -1,
        muted: false
    },
    emojiPanel: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<IUser>) {
            state.user = { ...action.payload }
        },
        toggleEmojiPanel(state) {
            state.emojiPanel = !state.emojiPanel
        }
    }
})

export const selectUser = (state: RootState) => state.app.user
export const selectEmojiPanel = (state: RootState) => state.app.emojiPanel

export const appReducer = appSlice.reducer
export const { updateUser, toggleEmojiPanel } = appSlice.actions