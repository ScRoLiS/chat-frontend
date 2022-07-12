import { RootState } from './../index';
import { IMessage } from './../../types/messages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessagesState {
    messages: IMessage[]
}

const initialState: MessagesState = {
    messages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<IMessage>) {
            state.messages.push(action.payload)
        }
    }
})

export const selectMessages = (state: RootState) => state.messages.messages

export const messagesReducer = messagesSlice.reducer
export const { addMessage } = messagesSlice.actions