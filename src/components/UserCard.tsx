import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/UserCard.css";
import "../CSS/UserGallery.css";
import {UserType} from "../Types/UserType";

interface IProps {
    user:UserType;
}

const UserCard: FC<IProps> = ({user}) => {
 const navigation = useNavigate();
 const name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
 if(user.tdLists == null) {
    return <section className="User--loading">loading usercard</section>
 }
 else {
  return (
    <section className="User--item">
    <button className="User--main" onClick={() => navigation("/User", {state: {listId: user.id }})}>
    <section className="User--section">
        <h2 className="UserCard--name">{name}</h2>
        <h5 className="User--lists">is working on these lists:</h5>
        <ul className="User--ul">{user.tdLists.map(list => <li className="User--li">{list.title}</li>)}</ul>
    </section>
    </button >
    </section>

  );
 }
}

export default UserCard;
