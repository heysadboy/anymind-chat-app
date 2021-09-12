import usersData from '../data/users.json';
import "../css/DropDown.css";
import { FC } from 'react';
import { IUser } from '../utils/interfaces';

interface IDropDownProps {
    currentUser: IUser,
    setCurrentUser: (currentUser: IUser) => void,
    userData: IUser[]
}

const DropDown: FC<IDropDownProps> = ({ currentUser, setCurrentUser, userData }) => {

    const setUser = (e: any) => {
        const user = usersData.find(ele => ele.name === e.target.dataset.value);
        if (user !== undefined) {
            setCurrentUser(user);
        }
    }

    const usersList = usersData.map((user) => {
        if (currentUser.name === user.name) {
            return (<div className="item active" key={user.id} data-value={user.name} onClick={setUser}>{user.name} </div>);
        }
        else {
            return (<div className="item" key={user.id} data-value={user.name} onClick={setUser}>{user.name} </div>);
        }
    });

    return (
        <div className="ui menu">
            <div className="ui fluid simple dropdown item" >
                <div>{currentUser.name}</div>
                <div className="menu" >
                    {usersList}
                </div>
                <i id="dropdown-icon" className="dropdown icon"></i>
            </div>
        </div>

    );
};

export default DropDown;