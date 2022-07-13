import React from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import './ScrollDown.scss'

interface ScrollDownProps {
    onClick?(): void;
}

export const ScrollDown: React.FC<ScrollDownProps> = ({ onClick }) => {
    return (
        <button className="scroll-down" onClick={onClick}><AiOutlineDown /></button>
    )
}
