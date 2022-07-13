import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'

interface ModalProps {
    onBackdrop(): void;
    children: React.ReactNode
}

export const Modal = ({ onBackdrop, children }: ModalProps) => {
    return (
        ReactDOM.createPortal(
            <div className="modal" onClick={onBackdrop}>
                {children}
            </div>
            , document.getElementById('modal') as HTMLElement
        )
    )
}
