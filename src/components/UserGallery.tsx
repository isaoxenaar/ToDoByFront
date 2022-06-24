import React, {useEffect, useState} from "react";
import { UserType } from "../Types/UserType";

const UserGallery = () => {

    const [users, setUser] = useState<UserType[]>();

    const fetchUsers = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/User")
        const response = await request.json();
        console.log(response);
        setUser(response);
    }
    
    useEffect(() => {
        fetchUsers();
    }, [])

        if(!users)
            return <div>loading in user</div>
        return (
            <div>users: {users.map(us => <p>{us.name}</p>)}</div>
        )
}

export default UserGallery;