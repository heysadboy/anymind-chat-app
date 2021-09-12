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
    setPostError: (error: boolean) => void
}

const SendMessage: FC<ISendMessageProps> = ({ currentChannel, currentUser, messages, setMessages, setPostError }) => {
    const [sendMessage, { error, data }] = useMutation(SEND_MESSAGE);
    const submitMessage = (e: any) => {
        e.preventDefault();
        const variables = {
            channelId: currentChannel.id,
            text: e.target.message.value,
            userId: currentUser.name
        }
        sendMessage({ variables: variables });
        console.log(error);

    }
    return (
        <form className="ui reply form" onSubmit={submitMessage}>
            <div className="field">
                <textarea id="textarea" placeholder="Type your message here..." name="message"/>
            </div>
            <button type="submit" className="ui right labeled blue icon button">
                <i className="icon paper plane"></i> Send Message
            </button>
        </form>
    );
};

export default SendMessage;