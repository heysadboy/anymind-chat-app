import React, { FC, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import Message from "./Message";
import "../css/ChatContainer.css";
import { EMessageType } from '../utils/enums';
import { FETCH_MORE_MESSAGES, FETCH_LATEST_MESSAGES } from '../api/queries';

import Loader from './Loader';
import Error from './Error';
import { IChannel, IUser, IMessage } from '../utils/interfaces';
import Empty from './Empty';
import SendMessage from './SendMessage';

interface IChatContainerProps {
    currentUser: IUser,
    currentChannel: IChannel
}

//Chat Container
const ChatContainer: FC<IChatContainerProps> = ({ currentUser, currentChannel }) => {
    const [query, setQuery] = useState(FETCH_LATEST_MESSAGES);
    const [variables, setVariables] = useState({ channelId: currentChannel.id });
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [firstMessage, setFirstMessage] = useState("");
    const [lastMessage, setLastMessage] = useState("");
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const { loading, error, data } = useQuery(query, {
        variables: variables
    });

    const updateQuery = (isOld: boolean, messageId: string) => {
        const newVariables = {
            channelId: currentChannel.id,
            messageId: messageId,
            old: isOld
        }
        setVariables(newVariables);
        setQuery(FETCH_MORE_MESSAGES);
    }

    const getMoreMessages = (isOld: boolean) => {

        if (messages.length > 0) {
            //Set first and last message to be send on the button click

            const messageId = isOld ? firstMessage : lastMessage;
            if (messageId !== "") {
                updateQuery(isOld, messageId);
            }
        }
        else if (messages.length === 0 && firstMessage !== "" && lastMessage !== "") {
            const messageId = isOld ? lastMessage : firstMessage;
            updateQuery(isOld, messageId);
        }
    }

    //Scroll to the bottom of the chat container
    useEffect(() => {
        if (messages.length > 0) {
            setFirstMessage(messages[0].messageId);
            setLastMessage(messages[messages.length - 1].messageId);
        }

        if (messageContainerRef.current != null) {
            const scrollHeight = messageContainerRef.current.scrollHeight;
            const height = messageContainerRef.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messageContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }, [messages]);

    //Order messages
    const orderMessages = (unorderedMessages: IMessage[]) => {
        if (unorderedMessages.length > 0) {
            if (unorderedMessages[0].datetime > unorderedMessages[unorderedMessages.length - 1].datetime) {
                return [...unorderedMessages].reverse();
            }
            else {
                return unorderedMessages;
            }
        }
        else {
            return unorderedMessages;
        }
    }

    //Get messages and more messages if the button is clicked
    useEffect(() => {
        if (data !== undefined) {
            if (data.fetchLatestMessages) {
                setMessages(orderMessages(data.fetchLatestMessages));
            }
            else {
                setMessages(orderMessages(data.fetchMoreMessages));
            }
        }
    }, [data]);

    //Change channel name and query if changed from the sidebar
    useEffect(() => {
        setVariables({ channelId: currentChannel.id });
        setQuery(FETCH_LATEST_MESSAGES);
    }, [currentUser, currentChannel]);

    //Function to provide the component according to the query status
    const getChat = () => {
        if (loading) {
            return (<Loader />);
        }
        else if (error) {
            return (<Error />);
        }
        else if (messages.length === 0) {
            return (<Empty />);
        }
        else {
            const messagesList = messages.map((message: IMessage) => {
                const messageType = message.userId === currentUser.name ? EMessageType.receiver : EMessageType.sender;
                return <Message key={message.messageId} messageType={messageType} messageDetail={message} />
            });

            return (
                <div ref={messageContainerRef} id="message-container">
                    {messagesList}
                </div>
            );
        }
    }

    return (
        <div>
            <div id="chat-container" >
                <h3 className="ui header">{currentChannel.name}</h3>
                <div className="ui right labeled basic icon button" onClick={() => getMoreMessages(true)}>
                    <i className="icon arrow up"></i> Read More
                </div>
                {getChat()}
                <div className="ui right labeled basic icon button" onClick={() => getMoreMessages(false)}>
                    <i className="icon arrow down"></i> Read More
                </div>
            </div>
            <SendMessage currentChannel={currentChannel} currentUser={currentUser} messages={messages} setMessages={setMessages} />
        </div>);
};

export default ChatContainer;
