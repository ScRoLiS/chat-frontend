import React, { FormEvent, MouseEvent } from 'react'
import { SocketContext } from '../../contexts/socket-context'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/slices/app-slice'
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
    const me = useAppSelector(selectUser)
    const [name, setName] = React.useState(me.name)
    const [avatar, setAvatar] = React.useState(me.avatar)

    const handleName = (e: FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value.substring(0, 30).trimStart())
    }

    const handleSave = () => {
        const user: IUser = {
            id: socket.id,
            name,
            avatar,
            muted: false
        }
        onSave(user)
    }

    const isDisabled = () => {
        const isEmpty = (avatar < 0) || (name.length < 3)
        const isEdited = name === me.name && avatar === me.avatar

        return isEmpty || isEdited
    }

    return (
        <div className="settings scrollbar" onClick={(e: MouseEvent) => { e.stopPropagation() }}>
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
                <Button
                    disabled={isDisabled()}
                    variant="large"
                    onClick={handleSave}
                    className="button--save"
                >
                    {onClose ? 'Save' : 'Continue'}
                </Button>
                {onClose && (
                    <Button variant="large" onClick={onClose} className="button--close">Close</Button>
                )}
            </div>
        </div>
    )
}
