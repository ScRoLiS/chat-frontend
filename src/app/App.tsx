import React from 'react';
import { Event } from '../types/events';
import { IUser } from '../types/user';
import { useAuth } from '../hooks';
import { addMessage } from '../store/slices/messages-slice';
import { updateUsers } from '../store/slices/users-slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LoadingPage, Page } from '../pages';
import { IMessage } from '../types/messages';
import { socket, SocketContext } from '../contexts/socket-context';
import { createConnectMessage, createDisconnectMessage, createUpdateMessage } from '../utils/message-creators';
import { selectUser, updateUser } from '../store/slices/app-slice';
import './App.scss';

function App() {
  const me = useAppSelector(selectUser)
  const isAuth = useAuth()
  const dispatch = useAppDispatch()
  const [connected, setConnected] = React.useState(false)

  React.useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)

      if (isAuth) {
        console.log(socket.id);
        const user: IUser = { ...me, id: socket.id }
        dispatch(updateUser(user))
        socket.emit(Event.USER_CONNECT, user)
      }

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
