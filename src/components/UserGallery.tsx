import React, {useEffect, useState} from "react";
import { UserType } from "../Types/UserType";
import UserCard from "../components/UserCard";
import { ListType } from "../Types/ListType";
import { Console } from "console";

const UserGallery = () => {

    const [users, setUsers] = useState<UserType[]>([{id: 0, name: "", email: "", password: "", tdLists:[]}]);
    const [lists, setLists] = useState<ListType[]>([{id: 0, title: "", totalcost: 0, todoitems:[], userId:0}]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchLists = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/List")
        const response = await request.json();
        console.log(response);
        setLists(response);
    }

    const fetchUsers = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/User")
        const response = await request.json();
        console.log(response);

        const request2 = await fetch("https://todoby.azurewebsites.net/api/List")
        const response2 = await request2.json();
        console.log(response2);        
        
        const includeLists = response.map((user:UserType) => {
            console.log("before" + user.id)

            user.tdLists = response2.filter((list:ListType) => list.userId == user.id);
            console.log(user.id)
            return user;
        });

        console.log("listsl" + includeLists[0])
        setUsers(includeLists);
    }
    
    const createUser = async () => {
        const user = {name: "zomer"}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        const request = await fetch("https://todoby.azurewebsites.net/api/User", requestOptions)
    }

    useEffect(() => {
        fetchUsers();
        setLoading(false);
        console.log(users[0])
    }, [loading])

        if(loading )
            return <div>loading in user</div>
        else {
            console.log(users[0])
        return (
            <div>users: {users.map((us:UserType) => <UserCard user={us}/>)}</div>
        )
        }
}

export default UserGallery;

//1. all users.
//2. click on one user.
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