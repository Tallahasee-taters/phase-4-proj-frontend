import { useContext } from 'react';
import { UserContext } from '../context/userContext';


const UserAccount = () => {
    const {user} = useContext(UserContext);
    console.log(user)

    return (
        <div>
            <h1>Welcome {user.username}</h1>
        </div>
    );
}

export default UserAccount;
