import { IUser } from './user';

export interface Message {
    type: 'MESSAGE' | 'DISCONNECT' | 'CONNECT' | 'UPDATE';
    body?: string;
}

export interface IMessage {
    user: IUser;
    message: Message;
}