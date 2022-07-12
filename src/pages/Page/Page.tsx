import React from 'react'
import { useAuth } from '../../hooks'
import { ChatPage } from '../ChatPage/ChatPage'
import { LoginPage } from '../LoginPage/LoginPage'

export const Page = () => {
    const isAuth = useAuth()
    
    if (isAuth) return <ChatPage />

    return <LoginPage />
}
