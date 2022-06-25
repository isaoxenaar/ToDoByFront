import React, {FC, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/User.css";
import {UserType} from "../Types/UserType";

interface IProps {
    user:UserType;
}

const UserCard: FC<IProps> = ({user}) => {
 const navigation = useNavigate();

  return (
    <button className="User--main" onClick={() => navigation("/User", {state: {card: user.id }})}>
    <section className="User--section">
        <h2 className="User--name">{user.name}</h2>
        <ul className="User--ul">{user.tdLists.map(list => <li>{list.title}</li>)}</ul>
    </section>
    </button >
  );
}

export default UserCard;
//change color on how well deadlines were met.