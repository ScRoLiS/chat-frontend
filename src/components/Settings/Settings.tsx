import React, { FormEvent } from 'react'
import { SocketContext } from '../../contexts/socket-context'
import { IUser } from '../../types/user'
import { AvatarPicker } from '../AvatarPicker/AvatarPicker'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import './Settings.scss'

interface SettingsProps {
    title?: string;
    onSave(user: IUser): void;
    onClose?(): void;
}

export const Settings: React.FC<SettingsProps> = ({ title = 'Settings', onSave, onClose }) => {
    const socket = React.useContext(SocketContext)
    const [name, setName] = React.useState('')
    const [avatar, setAvatar] = React.useState(-1)

    const handleName = (e: FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value.substring(0, 30).trimStart())
    }

    const handleSave = () => {
        const user: IUser = {
            id: socket.id,
            name,
            avatar
        }
        onSave(user)
    }

    return (
        <div className="settings scrollbar">
            <h1>{title}</h1>
            <div className="settings__group">
                <span>Your name</span>
                <Input value={name} onChange={handleName} />
            </div>
            <div className="settings__group">
                <span>Your avatar</span>
                <AvatarPicker avatar={avatar} onPick={setAvatar} />
            </div>
            <div className="settings__buttons">
                <Button disabled={(avatar < 0) || (name.length < 3)} variant="save" onClick={handleSave}>{onClose ? 'Save' : 'Continue'}</Button>
                {onClose && (
                    <Button variant="close" onClick={onClose}>Close</Button>
                )}
            </div>
        </div>
    )
}
