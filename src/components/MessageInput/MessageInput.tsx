import React, { FormEvent, KeyboardEvent } from 'react'
import { Input } from '../Input/Input'
import { IconButton } from '../IconButton/IconButton'
import { MdSend } from 'react-icons/md'
import './MessageInput.scss'
import { SocketContext } from '../../contexts/socket-context'
import { createMessage } from '../../utils/message-creators'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/slices/app-slice'
import { Event } from '../../types/events'

export const MessageInput = () => {
    const socket = React.useContext(SocketContext)
    const user = useAppSelector(selectUser)
    const [message, setMessage] = React.useState('')

    const handleMessage = (e: FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value.substring(0, 1000).trimStart())
    }

    const handleKeyboard = (e: KeyboardEvent) => {
        if (e.key === 'Enter')
            sendMessage()
    }

    const sendMessage = () => {
        const msg = createMessage(user, {
            type: 'MESSAGE',
            body: message.trim()
        })

        socket.emit(Event.USER_MESSAGE, msg)
        setMessage('')
    }

    return (
        <div className="message-input">
            <Input value={message} onKeyDown={handleKeyboard} onChange={handleMessage} className="message-input__input" placeholder="Your message is..." />
            <IconButton onClick={sendMessage} disabled={message.length === 0} className="message-input__send"><MdSend /></IconButton>
        </div>
    )
}
