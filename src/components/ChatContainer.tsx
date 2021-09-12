import React, { FC, useEffect, useState } from 'react';
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

const ChatContainer: FC<IChatContainerProps> = ({ currentUser, currentChannel }) => {
    const [query, setQuery] = useState(FETCH_LATEST_MESSAGES);
    const [variables, setVariables] = useState({ channelId: currentChannel.id });
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [postError, setPostError] = useState(false);


    const { loading, error, data } = useQuery(query, {
        variables: variables
    });

    const getMoreMessages = (isOld: boolean, messageId: string) => {
        const newVariables = {
            channelId: currentChannel.id,
            messageId: messageId,
            old: isOld
        }
        setVariables(newVariables);
        setQuery(FETCH_MORE_MESSAGES);
    }



    useEffect(() => {
        if (data !== undefined) {
            if (data.fetchLatestMessages) {
                setMessages([...data.fetchLatestMessages].reverse());
            }
            else {
                setMessages([...data.fetchMoreMessages].reverse());
            }
        }
    }, [data]);

    useEffect(() => {
        setVariables({ channelId: currentChannel.id });
        setQuery(FETCH_LATEST_MESSAGES);
    }, [currentUser, currentChannel]);

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
            const firstMessageId = messages[0].messageId;
            const lastMessageId = messages[messages.length - 1].messageId;
            return (
                <React.Fragment>
                    <div className="ui right labeled basic icon button" onClick={() => getMoreMessages(true, firstMessageId)}>
                        <i className="icon arrow up"></i> Read More
                    </div>
                    <div id="message-container">
                        {messagesList}
                    </div>
                    <div className="ui right labeled basic icon button" onClick={() => getMoreMessages(false, lastMessageId)}>
                        <i className="icon arrow down"></i> Read More
                    </div>
                </React.Fragment>
            );
        }
    }

    return (
        <div>
            <div id="chat-container" >
                <h3 className="ui header">{currentChannel.name}</h3>
                {getChat()}
            </div>
            <SendMessage currentChannel={currentChannel} currentUser={currentUser} messages={messages} setMessages={setMessages} setPostError={setPostError} />
        </div>);
};

export default ChatContainer;
