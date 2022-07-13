import React from 'react'
import { getAvatar } from '../../assets/avatars';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/app-slice';
import { muteUser } from '../../store/slices/users-slice';
import { IUser } from '../../types/user'
import { Button } from '../Button/Button';
import './UserItem.scss'

interface UserItemProps {
    user: IUser;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
    const me = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const Avatar = getAvatar(user.avatar)

    const handleMute = (id: string) => {
        dispatch(muteUser(id))
    }

    return (
        <div className="user-item">
            <Avatar />
            <span>{user.name}</span>
            {(me.id !== user.id) && (
                <Button variant="small" onClick={() => { handleMute(user.id) }}>{user.muted ? 'Unmute' : 'Mute'}</Button>
            )}
        </div>
    )
}
