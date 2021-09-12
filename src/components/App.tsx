import { useState } from "react";
import ChatContainer from "./ChatContainer";
import SideBar from "./SideBar";
import usersData from "../data/users.json";
import channelsData from "../data/channels.json";
import "../css/App.css";
import { IChannel, IUser } from "../utils/interfaces";

const App = () => {
    const [currentUser, setCurrentUser] = useState<IUser>(usersData[0]);
    const [currentChannel, setCurrentChannel] = useState<IChannel>(channelsData[0]);
    
    return (
        <div id="app-container" className="ui container">
            <h2>1 Day Chat App</h2>
            <div>All messages will be deleted at every 00:00 UTC</div>
            <div id="main-segment" className="ui segment grid">
                <div className="six wide column">
                    <SideBar usersData={usersData} channelsData={channelsData} currentUser={currentUser} 
                    setCurrentUser={setCurrentUser} currentChannel={currentChannel} setCurrentChannel={setCurrentChannel}/>
                </div>
                <div className="ten wide column">
                    <ChatContainer currentUser={currentUser} currentChannel={currentChannel}/>
                </div>
            </div>
        </div>
    );
};

export default App;