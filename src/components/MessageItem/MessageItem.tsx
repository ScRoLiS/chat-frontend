import clsx from 'clsx';
import React from 'react'
import { getAvatar } from '../../assets/avatars';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/app-slice';
import { addReply } from '../../store/slices/message-input-slice';
import { removeMessage } from '../../store/slices/messages-slice';
import { IMessage } from '../../types/messages'
import { MessageControls } from '../MessageControls/MessageControls';
import { MessageReply } from '../MessageReply/MessageReply';
import './MessageItem.scss'

interface MessageItemProps {
    message: IMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const dispatch = useAppDispatch()
    const me = useAppSelector(selectUser)
    const Avatar = getAvatar(message.user.avatar)

    const remove = () => {
        if (message.id) dispatch(removeMessage(message.id))
    }

    const reply = () => {
        dispatch(addReply(message))
    }

    switch (message.message.type) {
        case 'NOTIFY':
            return (
                <div className="message-item message-item--notify">
                    {message.message.body}
                </div>
            )
        case 'MESSAGE':
            return (
                <div id={message.id?.toString()} className={clsx('message-item', {
                    'message-item--me': me.id === message.user.id,
                    'message-item--to-me': me.id === message.message.reply?.user.id
                })}>
                    <Avatar className="message-item__avatar" />
                    <div className="message-item__body">
                        <span className="message-item__name">{message.user.name}</span>
                        {message.message.reply && (
                            <MessageReply message={message.message.reply} />
                        )}
                        <p className="message-item__text">{message.message.body}</p>
                        <div className="message-item__controls">
                            <MessageControls onReply={reply} onDelete={remove} />
                            <span className="message-item__time">{message.message.time}</span>
                        </div>
                    </div>
                </div>
            )
    }

    return null
}
