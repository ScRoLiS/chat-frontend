import React from 'react'
import clsx from 'clsx'
import './Input.scss'

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    return (
        <input {...props} className={clsx('input', className)} />
    )
}
