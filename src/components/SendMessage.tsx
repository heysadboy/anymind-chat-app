import { useMutation } from "@apollo/client";
import { FC } from "react";
import { SEND_MESSAGE } from '../api/mutations';
import { IChannel, IUser } from "../utils/interfaces";

interface ISendMessageProps {
    currentChannel: IChannel,
    currentUser: IUser
}

const SendMessage: FC<ISendMessageProps> = ({ currentChannel, currentUser }) => {
    const [sendMessage, { error, data }] = useMutation(SEND_MESSAGE);
    const submitMessage = (e: any) => {
        e.preventDefault();
        console.log(e.target.message.value);
        const variables = {
            channelId: currentChannel.id,
            text: e.target.message.value,
            userId: currentUser.name
        }
        sendMessage({ variables: variables });
        console.log(data);

    }
    return (
        <form className="ui reply form" onSubmit={submitMessage}>
            <div className="field">
                <textarea placeholder="Type your message here..." name="message"/>
            </div>
            <button type="submit" className="ui right labeled blue icon button">
                <i className="icon paper plane"></i> Send Message
            </button>
        </form>
    );
};

export default SendMessage;