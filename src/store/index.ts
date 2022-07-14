import { usersReducer } from './slices/users-slice';
import { messagesReducer } from './slices/messages-slice';
import { appReducer } from './slices/app-slice';
import { configureStore } from '@reduxjs/toolkit'
import { messageInputReducer } from './slices/message-input-slice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        users: usersReducer,
        messages: messagesReducer,
        messageInput: messageInputReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch