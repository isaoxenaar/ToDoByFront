import React, { FC, useState, SyntheticEvent } from 'react';
import "../CSS/ToDoCard.css";
import { SubType } from '../Types/SubType';
import { ToDoType } from '../Types/ToDoType';

interface IProps {
  todo:ToDoType
}

const ToDoCard: FC<IProps> = ({todo}) => {
  const [newSub, setNewSub] = useState<SubType>({id: 0, title: "", text:"", deadline: "", cost: 0, todoid: 0})

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

  //patch price.
  //patch done.


  return (
    <section className="ToDoCard--main">
      <article>
      <span className="ToDoCard--title">{todo.title}</span>
      <span className="ToDoCard--deadline">{todo.deadline}</span>
      <span className="ToDoCard--cost">{todo.cost}</span>
      <form>patch price == total of all subtasks</form>
      <button className="ToDoCard-toggle" >toggle done/not done</button>
      </article>
      <form className="ToDoCard--form" onSubmit={createSub}>
        <input className="ToDoCard--input" placeholder="title" onChange={e => setNewSub({...newSub, title: e.target.value})}/>
        <input className="ToDoCard--input" placeholder="text" onChange={e => setNewSub({...newSub, text: e.target.value})}/>
        <input className="ToDoCard--input" placeholder="deadline" onChange={e => setNewSub({...newSub, deadline: e.target.value})}/>
        <input className="ToDoCard--input" placeholder="cost" onChange={e => setNewSub({...newSub, cost: parseInt(e.target.value)})}/>
        <button className="Listgallery--btn" type="submit">add item</button>
      </form>  
    </section>
  );
}

export default ToDoCard;
//create subtask.
//toggle done not done.
//patch price.

//update netlify.
//css
//make deadline a datetime prop also in backend.
//update models in backend with requerements.