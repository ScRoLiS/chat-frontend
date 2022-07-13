import React from 'react'
import { ChatPanel } from '../../components/ChatPanel/ChatPanel'
import { SidePanel } from '../../components/SidePanel/SidePanel'
import './ChatPage.scss'

export const ChatPage = () => {
    return (
        <div className="page chat-page">
            <SidePanel />
            <ChatPanel />
        </div>
    )
}
