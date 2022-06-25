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
    
    const createUser = async () => {
        const user = {name: "michal"}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        const request = await fetch("https://todoby.azurewebsites.net/api/User", requestOptions)
    }
    
    useEffect(() => {
        fetchUsers();
        createUser();
    }, [])

        if(!users)
            return <div>loading in user</div>
        return (
            <div>users: {users.map(us => <p>{us.name}</p>)}</div>
        )
}

export default UserGallery;