import React from 'react';
import { store } from '../store';
import { Event } from '../types/events';
import { IUser } from '../types/user';
import { IMessage } from '../types/messages';
import { addMessage } from '../store/slices/messages-slice';
import { updateUsers } from '../store/slices/users-slice';
import { useAppDispatch } from '../store/hooks';
import { LoadingPage, Page } from '../pages';
import { socket, SocketContext } from '../contexts/socket-context';
import { createConnectMessage, createDisconnectMessage, createUpdateMessage } from '../utils/message-creators';
import './App.scss';

function App() {
  const dispatch = useAppDispatch()
  const [connected, setConnected] = React.useState(false)

  React.useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)

    })

    socket.on(Event.USER_CONNECT, (user: IUser, users: IUser[]) => {
      const message: IMessage = createConnectMessage(user)
      dispatch(updateUsers(users))
      dispatch(addMessage(message))
    })

    socket.on(Event.USER_DISCONNECT, (user: IUser, users: IUser[]) => {
      const message: IMessage = createDisconnectMessage(user)
      dispatch(updateUsers(users))
      dispatch(addMessage(message))
    })

    socket.on(Event.USER_UPDATE, (oldUser: IUser, newUser: IUser, users: IUser[]) => {
      const messages: IMessage[] = createUpdateMessage(oldUser, newUser)
      messages.forEach((message) => {
        dispatch(addMessage(message))
      })
      dispatch(updateUsers(users))
    })

    socket.on(Event.USER_MESSAGE, (message: IMessage) => {
      const users = store.getState().users.users
      const user = users.find((item) => {
        return item.id === message.user.id
      })
      if (user && !user.muted)
        dispatch(addMessage(message))
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <div className="app">
        {connected ? <Page /> : <LoadingPage />}
      </div>
    </SocketContext.Provider>
  );
}

export default App;
