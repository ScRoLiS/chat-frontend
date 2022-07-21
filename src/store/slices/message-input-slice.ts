import { RootState } from './../index';
import { IMessage } from './../../types/messages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageInputState {
    reply?: IMessage;
    message: string;
}

const initialState: MessageInputState = {
    reply: undefined,
    message: ''
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
        },
        updateMessage(state, action: PayloadAction<string>) {
            state.message = action.payload
        },
        clearMessage(state) {
            state.message = ''
        },
        addEmoji(state, action: PayloadAction<string>) {
            state.message += action.payload
        }
    }
})

export const selectReply = (state: RootState) => state.messageInput.reply
export const selectMessage = (state: RootState) => state.messageInput.message

export const { addReply, deleteReply, clearMessage, updateMessage, addEmoji } = messageInputSlice.actions
export const messageInputReducer = messageInputSlice.reducer