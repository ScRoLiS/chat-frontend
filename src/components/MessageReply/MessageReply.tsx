import React, { MouseEvent } from 'react'
import { MdClose } from 'react-icons/md'
import { IMessage } from '../../types/messages'
import { IconButton } from '../IconButton/IconButton';
import { deleteReply } from '../../store/slices/message-input-slice';
import { useAppDispatch } from '../../store/hooks';
import './MessageReply.scss'
import clsx from 'clsx';

interface MessageReplyProps {
    message: IMessage;
    variant?: 'MESSAGE' | 'INPUT';
}

export const MessageReply: React.FC<MessageReplyProps> = ({ message, variant = 'MESSAGE' }) => {
    const dispatch = useAppDispatch()

    const removeReply = (e: MouseEvent) => {
        e.stopPropagation()
        dispatch(deleteReply())
    }

    const scrollToMessage = () => {
        if (message.id) {
            const element = document.getElementById(message.id.toString())
            element?.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    return (
        <div onClick={scrollToMessage} className={clsx('message-reply', {
            'message-reply--message': variant === 'MESSAGE'
        })}>
            <div className="message-reply__message">
                <div className="message-reply__name">
                    {message.user.name}
                </div>
                <div className="message-reply__text">
                    {message.message.body}
                </div>
            </div>
            {variant === 'INPUT' && (
                <IconButton variant="message" onClick={removeReply}><MdClose /></IconButton>
            )}
        </div>
    )
}
