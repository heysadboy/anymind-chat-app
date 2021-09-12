import channelData from "../data/channels.json";
import "../css/ChannelList.css";
import { IChannel } from "../utils/interfaces";
import { FC } from "react";

interface IChannelListProps {
    currentChannel: IChannel,
    setCurrentChannel: (currentChannel: IChannel) => void,
    channelsData: IChannel[]
}

const ChannelList: FC<IChannelListProps> = ({ currentChannel, setCurrentChannel, channelsData }) => {
    const channelList = channelData.map((channel) => {
        if (currentChannel.name === channel.name) {
            return (<div id="channel-list-item" key={channel.id} data-value={channel.name} className="active item">{channel.name}</div>);

        } else {
            return (<div id="channel-list-item" key={channel.id} data-value={channel.name} className="item">{channel.name}</div>);
        }
    });

    const setChannel = (e: any) => {
        const channel = channelsData.find((ele) => ele.name === e.target.dataset.value);
        if (channel !== undefined) {
            setCurrentChannel(channel);
        }
    }

    return (
        <div id="channel-list" className="ui fluid vertical menu" onClick={setChannel}>
            {channelList}
        </div>
    );
};

export default ChannelList;