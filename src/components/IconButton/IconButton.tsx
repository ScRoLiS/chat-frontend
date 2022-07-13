import clsx from 'clsx'
import React from 'react'
import './IconButton.scss'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'message' | 'default'
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className, variant = 'default', ...props }) => {
    return (
        <button {...props} className={clsx('icon-button', `icon-button--${variant}`, className)}>{children}</button>
    )
}
