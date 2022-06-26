import React, { FC, useEffect, useState } from 'react';
import "../CSS/ListCard.css";
import { useNavigate } from 'react-router-dom';
import { ListType } from '../Types/ListType';
import { ToDoType } from '../Types/ToDoType';

interface IProps {
  list: ListType;
}

const ListCard:FC<IProps> = ({list}) => {
  const navigation = useNavigate();
  console.log(list.todoitems);
  return (
        <button className="ListCard--main" onClick={() => navigation("/List", {state: {todoId: list }})}>
          <span>{list.title}</span>
          <ul>{list.todoitems.map((todo:ToDoType) => <li>{todo.title}</li>)}</ul>
        </button>
      );
}

export default ListCard;

//see list of todos.
//click on card to go to todo gallery. 
//create new list.