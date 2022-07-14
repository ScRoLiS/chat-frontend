import { RootState } from './../index';
import { IMessage } from './../../types/messages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageInputState {
    reply?: IMessage
}

const initialState: MessageInputState = {
    reply: undefined
}

const messageInputSlice = createSlice({
    name: 'message-input',
    initialState,
    reducers: {
        addReply(state, action: PayloadAction<IMessage>) {
            state.reply = action.payload
        },
        deleteReply(state) {
            state.reply = undefined
        }
    }
})

export const selectReply = (state: RootState) => state.messageInput.reply

export const { addReply, deleteReply } = messageInputSlice.actions
export const messageInputReducer = messageInputSlice.reducer