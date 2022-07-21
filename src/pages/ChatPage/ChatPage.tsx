import React from 'react'
import { ChatPanel } from '../../components/ChatPanel/ChatPanel'
import { EmojiPanel } from '../../components/EmojiPanel/EmojiPanel'
import { SidePanel } from '../../components/SidePanel/SidePanel'
import { useMobile } from '../../hooks'
import { useAppSelector } from '../../store/hooks'
import { selectEmojiPanel } from '../../store/slices/app-slice'
import './ChatPage.scss'

export const ChatPage = () => {
    const isMobile = useMobile()
    const emojiPanel = useAppSelector(selectEmojiPanel)
    const emojiComponent = React.useMemo(() => <EmojiPanel />, [])

    return (
        <div className="page chat-page">
            <SidePanel />
            <ChatPanel />
            {(emojiPanel && !isMobile) && emojiComponent}
        </div>
    )
}
