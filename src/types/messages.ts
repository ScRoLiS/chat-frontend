import { IUser } from './user';

export interface Message {
    type: 'MESSAGE' | 'NOTIFY';
    body?: string;
    time?: string;
}

export interface IMessage {
    user: IUser;
    message: Message;
}