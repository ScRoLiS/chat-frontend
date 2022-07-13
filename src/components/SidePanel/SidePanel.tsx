import React from 'react'
import { BsChatLeftText } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { SocketContext } from '../../contexts/socket-context'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectUser, updateUser } from '../../store/slices/app-slice'
import { selectUsers } from '../../store/slices/users-slice'
import { Event } from '../../types/events'
import { IUser } from '../../types/user'
import { IconButton } from '../IconButton/IconButton'
import { Modal } from '../Modal/Modal'
import { Settings } from '../Settings/Settings'
import { UserItem } from '../UserItem/UserItem'
import './SidePanel.scss'

export const SidePanel = () => {
    const socket = React.useContext(SocketContext)
    const users = useAppSelector(selectUsers)
    const me = useAppSelector(selectUser)
    const sortedUsers = React.useMemo(() => sort(users), [users])
    const [settings, setSettings] = React.useState(false)
    const dispatch = useAppDispatch()

    function sort(users: IUser[]) {
        const user = users.find((item) => {
            return item.id === me.id
        })

        const newUsers = users.filter((item) => {
            return item.id !== me.id
        })

        if (user)
            newUsers.unshift(user)

        return newUsers
    }

    const onSave = (user: IUser) => {
        socket.emit(Event.USER_UPDATE, user)
        dispatch(updateUser(user))
        setSettings(false)
    }

    return (
        <div className="side-panel">
            <div className="side-panel__header">
                <div className="side-panel__logo">
                    <BsChatLeftText />
                    <span>Chat App</span>
                </div>
                <div className="side-panel__buttons">
                    <IconButton onClick={() => { setSettings(state => !state) }}><FiSettings /></IconButton>
                </div>
            </div>
            <div className="side-panel__user-list scrollbar">
                {sortedUsers.map((user) => {
                    return <UserItem user={user} key={user.id} />
                })}
            </div>
            {settings && (
                <Modal onBackdrop={() => { setSettings(false) }}>
                    <Settings title="Settings" onSave={onSave} onClose={() => { setSettings(false) }} />
                </Modal>
            )}
        </div>
    )
}
