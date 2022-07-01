import React, { FC } from 'react';
import "../CSS/ListCard.css";
import "../CSS/ListGallery.css";
import { useNavigate } from 'react-router-dom';
import { ListType } from '../Types/ListType';
import { ToDoType } from '../Types/ToDoType';

interface IProps {
  list: ListType;
}

const ListCard:FC<IProps> = ({list}) => {
  const navigation = useNavigate();
  const title = list.title.charAt(0).toUpperCase() + list.title.slice(1);

  return (
        <article className="ListCard--item">
        <button className="ListCard--main" onClick={() => navigation("/List", {state: {listItem: list }})}>
          <section className="ListCard--title">{title}</section>
          <ul className="ListCard--ul">{list.todoitems.map((todo:ToDoType) => <li className="ListCard--li">{todo.title}</li>)}</ul>
        </button>
        </article>
      );
}

export default ListCard;

