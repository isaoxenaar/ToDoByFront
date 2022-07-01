import React, {useEffect, useState} from "react";
import "../CSS/UserGallery.css";
import { UserType } from "../Types/UserType";
import { ListType } from "../Types/ListType";
import UserCard from "../components/UserCard";
import AuthUser from "./AuthUser";

const UserGallery = () => {

    const [users, setUsers] = useState<UserType[]>([{id: 0, name: "", email: "", password: "", tdLists:[]}]);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName ] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    
    const fetchUsers = async () => {
        //const request = await fetch("https://localhost:7039/api/User");
        const request = await fetch("https://todoby.azurewebsites.net/api/User")
        const response = await request.json();

        //const request2 = await fetch("https://localhost:7039/api/List")
        const request2 = await fetch("https://todoby.azurewebsites.net/api/List")
        const response2 = await request2.json();
        
        const includeLists = response.map((user:UserType) => {
            user.tdLists = response2.filter((list:ListType) => list.userId === user.id);
            return user;
        });
        setUsers(includeLists);
        setLoading(false);
    }
    
    const createUser = async () => {
        const user = {name, email, password}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        //const request = await fetch("https://localhost:7039/api/User", requestOptions)
        const request = await fetch("https://todoby.azurewebsites.net/api/User", requestOptions)
        console.log(request.json())
    }

    useEffect(() => {
        fetchUsers();
        
    }, [loading])

        if(loading )
            return <section className="UserGallery--loading">loading users...</section>
        else {
        return (
            <section className="UserGallery--main">
                  <AuthUser/>
                <form className="UserGallery--form" onSubmit={createUser}>
                    <input className="UserGallery--input" placeholder="name" onChange={e => setName(e.target.value)}/>
                    <input type="email" className="UserGallery--input" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" className="UserGallery--input" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                    <button className="UserGallery--btn" type="submit">Register</button>
                </form>
                <section className="UserGallery--grid">
                 {users.map((us:UserType) => <UserCard user={us}/>)}
                 </section>
            </section>
        )
     }
}

export default UserGallery;

