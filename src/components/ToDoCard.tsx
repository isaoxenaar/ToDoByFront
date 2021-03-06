import React, { FC, useState, SyntheticEvent } from 'react';
import "../CSS/ToDoCard.css";
import { useNavigate } from 'react-router-dom';
import { SubType } from '../Types/SubType';
import { ToDoType } from '../Types/ToDoType';

interface IProps {
  todo:ToDoType,
  toggle(el:ToDoType):any
}

const ToDoCard: FC<IProps> = ({todo, toggle}) => {
  const [newSub, setNewSub] = useState<SubType>({id: 0, title: "", text:"", deadline: "", cost: 0, todoid: 0})
  const navigation = useNavigate();

  const createSub = async (e:SyntheticEvent) => {
    const sub = {title: newSub.title, text: newSub.text, deadline: newSub.deadline, cost: newSub.cost, todoid: todo.id}
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub)
    }
    const request = await fetch("https://todoby.azurewebsites.net/api/Sub", requestOptions)
    console.log(request.json())
  };

  return (
    <section className="ToDoCard--main">
      <article className="ToDoCard--text">
      <section className="ToDoCard--title">{todo.title}</section>
      <section className="ToDoCard--deadline">{todo.deadline}</section>
      <section className="ToDoCard--cost">{todo.cost}</section>
      <section className="ToDoCard--price">total of all subtasks.</section>
      <button className="ToDoCard-toggle" onClick={() => toggle(todo)}>{todo.done ? "Done!" : "Not done yet..."}</button>
      </article>
      <form className="ToDoCard--form" onSubmit={createSub}>
        <input className="ToDoCard--input" placeholder="title" onChange={e => setNewSub({...newSub, title: e.target.value})}/>
        <input className="ToDoCard--input" placeholder="text" onChange={e => setNewSub({...newSub, text: e.target.value})}/>
        <input className="ToDoCard--input" placeholder="deadline" onChange={e => setNewSub({...newSub, deadline: e.target.value})}/>
        <input className="ToDoCard--input" placeholder="cost" onChange={e => setNewSub({...newSub, cost: parseInt(e.target.value)})}/>
        <button className="Listgallery--btn" type="submit">add item</button>
      </form>  
      <button onClick={() => navigation("/Sub", {state: {todoItem: todo }})}>see subtasks for this todo</button>
    </section>
  );
}

export default ToDoCard;
