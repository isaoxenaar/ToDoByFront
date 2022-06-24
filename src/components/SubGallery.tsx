import React, { useState, useEffect } from 'react';
import { SubType } from "../Types/SubType";

const SubGallery = () => {
    const [subs, setSubs] = useState<SubType[]>();

    const fetchSubs = async () => {

        // const request = await fetch("https://localhost:7039/api/ToDo")
        const request = await fetch("https://todoby.azurewebsites.net/api/Sub")
        const response = await request.json();
        console.log(response);
        setSubs(response);
    }

    useEffect(() => {
        fetchSubs();
    }, [])

        if(!subs)
            return <div>loading in todogallery</div>
        return (
            <div>subs: {subs.map(sub => <p>{sub.title}</p>)}</div>
        )
}

export default SubGallery;
