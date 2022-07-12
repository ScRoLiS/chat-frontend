import React from 'react';
import { socket, SocketContext } from '../contexts/socket-context';
import { LoadingPage, Page } from '../pages';
import './App.scss';

function App() {
  const [connected, setConnected] = React.useState(false)

  React.useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)
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
