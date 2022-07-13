import { IMessage, Message } from './../types/messages';
import { IUser } from './../types/user';

export const createConnectMessage = (user: IUser): IMessage => {
    const message: IMessage = {
        user,
        message: {
            type: 'NOTIFY',
            body: `${user.name} joined the chat`
        }
    }

    return message
}

export const createDisconnectMessage = (user: IUser): IMessage => {
    const message: IMessage = {
        user,
        message: {
            type: 'NOTIFY',
            body: `${user.name} left the chat`
        }
    }

    return message
}

export const createMessage = (user: IUser, msg: Message): IMessage => {
    const message: IMessage = {
        user,
        message: {
            ...msg,
            time: new Date().toLocaleTimeString().substring(0, 5)
        },
    }

    return message
}

export const createUpdateMessage = (oldUser: IUser, newUser: IUser): IMessage[] => {
    const messages: IMessage[] = []

    if (oldUser.name !== newUser.name) {
        const nameMessage: IMessage = {
            user: newUser,
            message: {
                type: 'NOTIFY',
                body: `${oldUser.name} changed name to ${newUser.name}`
            }
        }

        messages.push(nameMessage)
    }

    if (oldUser.avatar !== newUser.avatar) {
        const avatarMessage: IMessage = {
            user: newUser,
            message: {
                type: 'NOTIFY',
                body: `${newUser.name} changed avatar`
            }
        }

        messages.push(avatarMessage)
    }

    return messages
}