const Loader = () => {
    return (
        <div className="ui icon message">
            <i className="notched circle loading icon"></i>
            <div className="content">
                <div className="header">Please wait for a moment</div>
                <p>Getting your chats</p>
            </div>
        </div>
    );
};

export default Loader;