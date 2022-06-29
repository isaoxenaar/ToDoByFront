import React from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import ToDoGallery from "./components/TodoGallery";
import UserGallery from "./components/UserGallery";
import ListGallery from './components/ListGallery';
import Login from "./components/Login";
import Register from "./components/Register";
import SubGallery from './components/SubGallery';
import Logout from "./components/Logout";

const App = () => {
  const location:any = useLocation();
  const listId = location.state == null ? 0 : location.state.listId;
  const listItem = location.state == null ? 0 : location.state.listItem;
  const todoItem = location.state == null ? 0 : location.state.todoItem;

  return (
    <main className="App--main">
      <section className="App--title">
      <header className="App--header">Mother of ToDo's</header>
      <nav className="App--nav">
      <Link className="App--link1" to="/">Home</Link>
      <Link className="App--link3" to="/Register">Register</Link>
      <Link className="App--link2" to="/Login">Login</Link>
      <Link className="App--link5" to="/Logout">Logout</Link>
      <Link className="App--link4" to="/Users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Logout" element={<Logout/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Users" element={<UserGallery/>}></Route>
        <Route path="/User" element={<ListGallery id={listId}/>}></Route>
        <Route path="/List" element={<ToDoGallery listItem={listItem}/>}></Route>
        <Route path="/Sub" element={<SubGallery todoItem={todoItem}/>}></Route>
      </Routes>
      <footer className="App--footer"> made by me for you.</footer>
      </section>
    </main>
  );
}

export default App;
