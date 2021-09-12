import { useMutation } from "@apollo/client";
import { FC } from "react";
import { SEND_MESSAGE } from '../api/mutations';
import { IChannel, IMessage, IUser } from "../utils/interfaces";
import "../css/SendMessage.css";

interface ISendMessageProps {
    currentChannel: IChannel,
    currentUser: IUser,
    messages: IMessage[],
    setMessages: (messages: IMessage[]) => void,
}

const SendMessage: FC<ISendMessageProps> = ({ currentChannel, currentUser, messages, setMessages }) => {
    const [sendMessage] = useMutation(SEND_MESSAGE);
    const submitMessage = (e: any) => {
        e.preventDefault();
        const variables = {
            channelId: currentChannel.id,
            text: e.target.message.value,
            userId: currentUser.name
        }

        sendMessage({ variables: variables })
            .then(response => {
                const newMessage: IMessage = response.data.postMessage;
                setMessages([...messages, newMessage])
                e.target.message.value = "";
            }).catch(error => {
                const datetime = new Date().toString();
                const newMessage: IMessage = {
                    messageId: `error${datetime}`,
                    userId: currentUser.name,
                    datetime: datetime,
                    text: e.target.message.value
                }

                setMessages([...messages, newMessage]);
            });
    }

    return (
        <form className="ui reply form" onSubmit={submitMessage}>
            <div className="field">
                <textarea id="textarea" placeholder="Type your message here..." name="message" />
            </div>
            <button type="submit" className="ui right labeled blue icon button">
                <i className="icon paper plane"></i> Send Message
            </button>
        </form>
    );

};

export default SendMessage;