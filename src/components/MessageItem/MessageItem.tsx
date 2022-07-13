import clsx from 'clsx';
import React from 'react'
import { getAvatar } from '../../assets/avatars';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/app-slice';
import { removeMessage } from '../../store/slices/messages-slice';
import { IMessage } from '../../types/messages'
import { MessageControls } from '../MessageControls/MessageControls';
import './MessageItem.scss'

interface MessageItemProps {
    index: number;
    message: IMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, index }) => {
    const dispatch = useAppDispatch()
    const me = useAppSelector(selectUser)
    const Avatar = getAvatar(message.user.avatar)

    const remove = () => {
        dispatch(removeMessage(index))
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
                <div className={clsx('message-item', {
                    'message-item--me': me.id === message.user.id
                })}>
                    <Avatar className="message-item__avatar" />
                    <div className="message-item__body">
                        <span className="message-item__name">{message.user.name}</span>
                        <p className="message-item__text">{message.message.body}</p>
                        <div className="message-item__controls">
                            <MessageControls onDelete={remove} />
                            <span className="message-item__time">{message.message.time}</span>
                        </div>
                    </div>
                </div>
            )
    }

    return null
}
