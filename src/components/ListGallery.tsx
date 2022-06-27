import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import "../CSS/ListGallery.css";
import { ListType } from '../Types/ListType';
import { UserType } from '../Types/UserType';
import { ToDoType } from '../Types/ToDoType';
import ListCard from './ListCard'

interface IProps {
    id: number;
}

const ListGallery: FC<IProps> = ({id}) => {
    const [todos, setToDos] = useState<ToDoType[]>([{id: 0, title:"", text: "", deadline: "", cost: 0, done: false, subitems: [], tdListId: 0}]);
    const [lists, setLists] = useState<ListType[]>([{id: 0, title: "", totalcost: 0, todoitems: [], userId: 0}]);
    const [user, setUser] = useState<UserType>({id: 0, name: "", password: "", email: "", tdLists: []});
    const [newList, setNewList] = useState<ListType>({id: 0, title: "", totalcost: 0, todoitems: [], userId: 0});
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const request = await fetch(`https://todoby.azurewebsites.net/${id}`, requestOptions)
        const response = await request.json();
        setUser(response);
    }

    const fetchToDos = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo")
        const response = await request.json();
        setToDos(response);
        fetchLists();
    } 
    const fetchLists = async () => {
        const request = await fetch(`https://todoby.azurewebsites.net/api/List`)
        const response = await request.json();

        response.map((list: ListType) => {
            list.todoitems = todos.filter((todo:ToDoType) => 
                todo.tdListId === list.id)
             return list;
        })
        if(id !== 0) {
            const byUser = response.filter((li:ListType) => li.userId === id);
            user.tdLists = lists;
            console.log(user.tdLists)
            setLists(byUser);
        }
        else {
            setLists(response);
        }
        setLoading(false)
    }

    const createList = async (e:SyntheticEvent) => {
        e.preventDefault();
        const list = {title: newList.title, userId: id}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(list)
        };
        //const request = await fetch("https://localhost:7039/api/List", requestOptions)
        const request = await fetch("https://todoby.azurewebsites.net/api/List", requestOptions)
        setLoading(!loading)
    }

    useEffect(() => {
        console.log(id)
        if(id > 0) {
            fetchUser();
        }
        fetchToDos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

        if(loading)
            return <div>loading in list</div>
        return (
            <section className="ListGallery--main">
                <span>{user.name}'s lists</span>
                <form className="ListGallery--form" onSubmit={createList}>
                    <input className="ListGallery--input" placeholder="title" onChange={e => setNewList({...newList, title: e.target.value})}/>
                    <button className="Listgallery--btn" type="submit">New List</button>
                </form>
                <section className="ListGallery--lists">
                    {lists.map(li => <ListCard list={li}/>)}
                </section>
            </section>
        )
}

export default ListGallery;
//if id is not empty, only lists of user, if id is empty all lists and display creater. 
//make a card of paler shades 