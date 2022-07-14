import { IUser } from './user';

export interface Message {
    type: 'MESSAGE' | 'NOTIFY';
    reply?: IMessage
    body?: string;
    time?: string;
}

export interface IMessage {
    id?: number;
    user: IUser;
    message: Message;
}