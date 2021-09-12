import { FC } from "react";
import { IChannel, IUser } from "../utils/interfaces";
import ChannelList from "./ChannelList";
import DropDown from "./DropDown";

interface ISideBarProps {
    usersData: IUser[],
    channelsData: IChannel[],
    currentUser: IUser,
    setCurrentUser: (currentUser: IUser ) => void,
    currentChannel: IChannel,
    setCurrentChannel: (currentChannel: IChannel) => void
}

const SideBar: FC<ISideBarProps> = ({ usersData, channelsData, currentUser, setCurrentUser, currentChannel, setCurrentChannel }) => {
    return (
        <div className="">
            <h3 className="ui header">Choose your user</h3>
            <DropDown currentUser={currentUser} setCurrentUser={setCurrentUser} userData={usersData}/>
            <h3 className="ui header">Choose your channel</h3>
            <ChannelList currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} channelsData={channelsData}/>
        </div>
    );
};

export default SideBar;