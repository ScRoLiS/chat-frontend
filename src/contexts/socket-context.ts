import React from 'react';
import { io, Socket } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'development' ? 'localhost:4000' : 'chat-app-back-server.herokuapp.com'

export const socket = io(URL)
export const SocketContext = React.createContext<Socket>(socket)