import React, { FormEvent, KeyboardEvent } from 'react'
import { Input } from '../Input/Input'
import { Event } from '../../types/events'
import { MdSend } from 'react-icons/md'
import { BsEmojiSmile } from 'react-icons/bs'
import { IconButton } from '../IconButton/IconButton'
import { selectEmojiPanel, selectUser, toggleEmojiPanel } from '../../store/slices/app-slice'
import { MessageReply } from '../MessageReply/MessageReply'
import { SocketContext } from '../../contexts/socket-context'
import { createMessage } from '../../utils/message-creators'
import { clearMessage, deleteReply, selectMessage, selectReply, updateMessage } from '../../store/slices/message-input-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useMobile } from '../../hooks'
import { EmojiPanel } from '../EmojiPanel/EmojiPanel'
import clsx from 'clsx'
import './MessageInput.scss'

export const MessageInput = () => {
    const dispatch = useAppDispatch()
    const isMobile = useMobile();
    const emojiPanel = useAppSelector(selectEmojiPanel)
    const user = useAppSelector(selectUser)
    const reply = useAppSelector(selectReply)
    const message = useAppSelector(selectMessage)
    const socket = React.useContext(SocketContext)
    const emojiComponent = React.useMemo(() => <EmojiPanel />, [])

    const handleMessage = (e: FormEvent<HTMLInputElement>) => {
        dispatch(updateMessage(e.currentTarget.value.substring(0, 1000).trimStart()))
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
        dispatch(clearMessage())
        dispatch(deleteReply())
    }

    return (
        <div className="message-input">
            {reply && (
                <MessageReply message={reply} variant="INPUT" />
            )}
            <div className="message-input__container">
                <div className="message-input__input-wrapper">
                    <Input
                        value={message}
                        onKeyDown={handleKeyboard}
                        onChange={handleMessage}
                        className={clsx('message-input__input', {
                            'message-input__input--reply': reply
                        })}
                        placeholder="Your message is..."
                    />
                    <IconButton className={clsx('message-input__emoji', {
                        'message-input__emoji--open': emojiPanel
                    })} onClick={() => { dispatch(toggleEmojiPanel()) }}>
                        <BsEmojiSmile />
                    </IconButton>
                </div>
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
            {(isMobile && emojiPanel) && emojiComponent}
        </div>
    )
}
