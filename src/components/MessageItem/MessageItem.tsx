import clsx from 'clsx';
import React from 'react'
import { getAvatar } from '../../assets/avatars';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/app-slice';
import { IMessage } from '../../types/messages'
import './MessageItem.scss'

interface MessageItemProps {
    message: IMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const me = useAppSelector(selectUser)
    const Avatar = getAvatar(message.user.avatar)

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
                    <Avatar />
                    <div className="message-item__body">
                        <span className="message-item__name">{message.user.name}</span>
                        <p className="message-item__text">{message.message.body}</p>
                    </div>
                </div>
            )
    }

    return null
}
