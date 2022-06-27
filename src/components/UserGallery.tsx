import React, {useEffect, useState} from "react";
import { UserType } from "../Types/UserType";
import { ListType } from "../Types/ListType";
import UserCard from "../components/UserCard";

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
        setLoading(false);
    }, [loading])

        if(loading )
            return <section className="UserGallery--loading">loading in user</section>
        else {
        return (
            <section className="UserGallery--main">
                <form className="UserGallery--form" onSubmit={createUser}>
                    <input className="UserGallery--input" placeholder="name" onChange={e => setName(e.target.value)}/>
                    <input type="email" className="UserGallery--input" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" className="UserGallery--input" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <button className="Usergallery--btn" type="submit">Register</button>
                </form>
                 {users.map((us:UserType) => <UserCard user={us}/>)}
            </section>
        )
        }
}

export default UserGallery;

//check 1. all users. 
//check 2. click on one user.
//3. see all to do lists.
//4. see create new to do list. 
//5. see total cost.
//6. freeze, unfreeze list.
//6. click on a list. 
//7. see all to do items. 
//8. see create new to do item.
//9. see toggle for done and not done. 
//10. see filter for only done ones. 
//11. see filter for deadline has passed.
//12. delete todoitem. 
//13. see total cost of list.
//14. click on todoitem. 
//15. see subitems.
//16. see create subitems.
//17. see toggle done.