import React, { useState, useEffect } from 'react';
import { ListType } from '../Types/ListType';

const ListGallery = () => {
    const [lists, setLists] = useState<ListType[]>();

    const fetchUsers = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/List")
        const response = await request.json();
        console.log(response);
        setLists(response);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

        if(!lists)
            return <div>loading in list</div>
        return (
            <div>lists: {lists.map(li => <p>{li.title}</p>)}</div>
        )
}

export default ListGallery;
