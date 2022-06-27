import React, { FC, useState, useEffect } from 'react';
import "../CSS/SubGallery.css";
import { SubType } from "../Types/SubType";
import { ToDoType } from '../Types/ToDoType';

interface IProps {
    todoItem: ToDoType
}

const SubGallery: FC<IProps>= ({todoItem}) => {
    const [loading, setLoading ] = useState<boolean>(true);
    const [subs, setSubs] = useState<SubType[]>([{id: 0, title: "", text: "", deadline: "", cost: 10, todoid: 0 }]);

    const fetchSubs = async () => {
        //const request = await fetch("https://localhost:7039/api/Sub")
        const request = await fetch("https://todoby.azurewebsites.net/api/Sub")
        const response = await request.json();
        console.log(response);
        setSubs(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchSubs();
    }, [loading])

        if(loading)
            return <div>loading in todogallery</div>
        return (
            <div>
                subs: {subs.map(sub => <p>{sub.title}</p>)}
            </div>
        )
}

export default SubGallery;
