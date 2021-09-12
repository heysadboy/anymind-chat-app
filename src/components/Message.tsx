import "../css/Message.css";
import { FC } from "react";
import { EMessageType } from "../utils/enums";
import { IMessage } from "../utils/interfaces";

interface IMessageProps {
    messageType: EMessageType,
    messageDetail: IMessage
}

const Message: FC<IMessageProps> = ({ messageType, messageDetail }) => {

    const userImage = require(`../images/${messageDetail.userId}.png`).default;
    const date = new Date(messageDetail.datetime);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const messageTime = `${hour}:${minute}`;

    if (messageType === EMessageType.sender) {
        return (
            <div id="message-container-left" className="ui items">
                <div className="item">
                    <div id="user-image-container-left" className="ui image">
                        <img id="user-image-left" src={userImage} alt={messageDetail.userId} />
                        <p id="user-name-left">{messageDetail.userId}</p>
                    </div>
                    <div id="message-content-container-left" className="content">
                        <div id="message-content-left" className="ui left pointing basic label">{messageDetail.text}</div>
                    </div>
                    <div id="message-details-left">{messageTime}</div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div id="message-container-right" className="ui items">
                <div className="item">
                    <div id="user-image-container-right" className="ui image">
                        <img id="user-image-right" src={userImage} alt={messageDetail.userId} />
                        <p id="user-name-right">{messageDetail.userId}</p>
                    </div>
                    <div id="message-content-container-right" className="content">
                        <div id="message-content-right" className="ui right pointing basic label">{messageDetail.text}</div>
                    </div>
                    {
                        messageDetail.messageId.startsWith("error") ?
                            <div id="message-details-right">{messageTime}<i className="red exclamation icon"></i></div> :
                            <div id="message-details-right">{messageTime}<i className="green check icon"></i></div>
                    }
                </div>
            </div>
        );
    }

};

export default Message;