import React from 'react';
import { socket, SocketContext } from '../contexts/socket-context';
import { LoadingPage, Page } from '../pages';
import { useAppDispatch } from '../store/hooks';
import { addMessage } from '../store/slices/messages-slice';
import { updateUsers } from '../store/slices/users-slice';
import { Event } from '../types/events';
import { IMessage, Message } from '../types/messages';
import { IUser } from '../types/user';
import './App.scss';

function App() {
  const dispatch = useAppDispatch()
  const [connected, setConnected] = React.useState(false)

  React.useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on(Event.USER_CONNECT, (users: IUser[]) => {
      dispatch(updateUsers(users))
    })

    socket.on(Event.USER_DISCONNECT, (users: IUser[]) => {
      dispatch(updateUsers(users))
    })

    socket.on(Event.USER_UPDATE, (users: IUser[]) => {
      dispatch(updateUsers(users))
    })

    socket.on(Event.USER_MESSAGE, (user: IUser, message: Message) => {
      const msg: IMessage = {
        user,
        message
      }
      dispatch(addMessage(msg))
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
