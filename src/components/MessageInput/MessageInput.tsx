import React, { FormEvent, KeyboardEvent } from 'react'
import { Input } from '../Input/Input'
import { Event } from '../../types/events'
import { MdSend } from 'react-icons/md'
import { IconButton } from '../IconButton/IconButton'
import { selectUser } from '../../store/slices/app-slice'
import { MessageReply } from '../MessageReply/MessageReply'
import { SocketContext } from '../../contexts/socket-context'
import { createMessage } from '../../utils/message-creators'
import { deleteReply, selectReply } from '../../store/slices/message-input-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import clsx from 'clsx'
import './MessageInput.scss'

export const MessageInput = () => {
    const user = useAppSelector(selectUser)
    const reply = useAppSelector(selectReply)
    const dispatch = useAppDispatch()
    const socket = React.useContext(SocketContext)
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
            reply,
            type: 'MESSAGE',
            body: message.trim()
        })

        socket.emit(Event.USER_MESSAGE, msg)
        setMessage('')
        dispatch(deleteReply())
    }

    return (
        <div className="message-input">
            {reply && (
                <MessageReply message={reply} variant="INPUT" />
            )}
            <div className="message-input__container">
                <Input
                    value={message}
                    onKeyDown={handleKeyboard}
                    onChange={handleMessage}
                    className={clsx('message-input__input', {
                        'message-input__input--reply': reply
                    })}
                    placeholder="Your message is..."
                />
                <IconButton
                    onClick={sendMessage}
                    disabled={message.length === 0}
                    className={clsx('message-input__send', {
                        'message-input__send--reply': reply
                    })}
                >
                    <MdSend />
                </IconButton>
            </div>
        </div>
    )
}
