import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { avatars } from '../../assets/avatars'
import './AvatarPicker.scss'

interface AvatarPickerProps {
    onPick(avatar: number): void;
    avatar: number;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ avatar, onPick }) => {
    return (
        <div className="avatar-picker">
            {avatars.map((Avatar, index) => {
                return (
                    <div key={index} className="avatar-picker__item" onClick={() => { onPick(index) }}>
                        <Avatar />
                        {(index === avatar) && (
                            <div className="avatar-picker__item-selected">
                                <AiOutlineCheckCircle />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
