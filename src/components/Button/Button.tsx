import React from 'react'
import clsx from 'clsx'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'large' | 'small'
}

export const Button: React.FC<ButtonProps> = ({ className, variant, children, ...props }) => {

    return (
        <button {...props} className={clsx('button', `button--${variant}`, className)} >{children}</button>
    )
}
