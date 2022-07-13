import React from 'react'
import { MessageInput } from '../MessageInput/MessageInput'
import { useAppSelector } from '../../store/hooks'
import { selectMessages } from '../../store/slices/messages-slice'
import './ChatPanel.scss'
import { MessageItem } from '../MessageItem/MessageItem'
import { useInView } from 'react-intersection-observer'
import { ScrollDown } from '../ScrollDown/ScrollDown'

export const ChatPanel = () => {
    const messages = useAppSelector(selectMessages)
    const messagesRef = React.useRef<HTMLDivElement>(null)
    const { inView, ref } = useInView()

    const scrollDown = () => {
        const scrollHeight = messagesRef.current?.scrollHeight
        if (scrollHeight) {
            messagesRef.current.scrollTo(0, scrollHeight)
        }
    }

    React.useEffect(() => {
        if (inView) {
            scrollDown()
        }
    }, [messages, inView])

    return (
        <div className="chat-panel">
            <div ref={messagesRef} className="chat-panel__container scrollbar">
                <div className="chat-panel__messages">
                    {messages.map((message, index) => {
                        return (
                            <MessageItem message={message} index={index} key={index} />
                        )
                    })}
                    <div className="chat-panel__scroller" ref={ref} />
                </div>
                {!inView && <ScrollDown onClick={scrollDown} />}
            </div>
            <MessageInput />
        </div>
    )
}
