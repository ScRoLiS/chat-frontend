import clsx from 'clsx'
import React from 'react'
import './IconButton.scss'

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
    return (
        <button {...props} className={clsx('icon-button', className)}>{children}</button>
    )
}
