import React from 'react'
import { Settings } from '../../components/Settings/Settings'
import { SocketContext } from '../../contexts/socket-context'
import { useAppDispatch } from '../../store/hooks'
import { updateUser } from '../../store/slices/app-slice'
import { Event } from '../../types/events'
import { IUser } from '../../types/user'
import './LoginPage.scss'

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const socket = React.useContext(SocketContext)

    const onSave = (user: IUser) => {
        socket.emit(Event.USER_CONNECT, user)
        dispatch(updateUser(user))
    }

    return (
        <div className="page login-page">
            <Settings onSave={onSave} title='Welcome!' />
        </div>
    )
}
