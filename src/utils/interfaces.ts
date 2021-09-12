export interface IUser {
    id: string,
    name: string
}

export interface IChannel {
    id: string,
    name: string
}

export interface IMessage {
    userId: string,
    messageId: string,
    text: string,
    datetime: string
}
