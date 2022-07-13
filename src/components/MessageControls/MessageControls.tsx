import React from 'react'
import { IconButton } from '../IconButton/IconButton'
import { BsReply } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import './MessageControls.scss'

interface MessageControlsProps {
    onDelete?(): void
}

export const MessageControls: React.FC<MessageControlsProps> = ({ onDelete }) => {
    return (
        <div className="message-controls">
            <IconButton variant="message"><BsReply /></IconButton>
            <IconButton onClick={onDelete} variant="message" className="icon-button--red"><AiOutlineDelete /></IconButton>
        </div>
    )
}
