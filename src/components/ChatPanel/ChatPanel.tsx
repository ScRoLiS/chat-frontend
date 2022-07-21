import React from 'react'
import { MessageInput } from '../MessageInput/MessageInput'
import { useAppSelector } from '../../store/hooks'
import { selectMessages } from '../../store/slices/messages-slice'
import { MessageItem } from '../MessageItem/MessageItem'
import { useInView } from 'react-intersection-observer'
import { ScrollDown } from '../ScrollDown/ScrollDown'
import './ChatPanel.scss'

export const ChatPanel = () => {
    const messages = useAppSelector(selectMessages)
    const { inView, ref } = useInView()

    const scrollDown = () => {
        const allMassages = document.querySelectorAll('.message-item')
        const element = allMassages[allMassages.length - 1]
        element?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    React.useEffect(() => {
        if (inView) {
            scrollDown()
        }
    }, [messages])

    return (
        <div className="chat-panel">
            <div className="chat-panel__scrollable">
                <div className="chat-panel__container scrollbar">
                    <div className="chat-panel__messages">
                        {messages.map((message) => {
                            return (
                                <MessageItem message={message} key={message.id} />
                            )
                        })}
                        <div className="chat-panel__scroller" ref={ref} />
                    </div>
                </div>
                {!inView && <ScrollDown onClick={scrollDown} />}
            </div>
            <MessageInput />
        </div>
    )
}
