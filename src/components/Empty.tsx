const Empty = () => {
    return (
        <div className="ui icon message">
            <i className="inbox icon"></i>
            <div className="content">
                <div className="header">No chats found</div>
                <p>This channel is empty</p>
            </div>
        </div>
    );
}

export default Empty;