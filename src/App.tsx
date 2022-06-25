import React from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import ToDoGallery from "./components/TodoGallery";
import UserGallery from "./components/UserGallery";
import UserCard from "./components/UserCard";
import ListGallery from './components/ListGallery';
import SubGallery from './components/SubGallery';
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const location:any = useLocation();
  const card = location.state == null ? 0 : location.state.card;

  return (
    <main className="App">
      <section className="App--title">
      <header className="App--header">God å møte deg</header>
      <nav className="App--nav">
      <Link className="App--link1" to="/">Home</Link>
      <Link className="App--link2" to="/Login">Login</Link>
      <Link className="App--link3" to="/Register">Register</Link>
      <Link className="App--link4" to="/Users">Users</Link>
      <Link className="App--link5" to="/User">Contact</Link>
      </nav>
      </section>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Users" element={<UserGallery/>}></Route>
         <Route path="/User" element={<ListGallery id={card}/>}></Route>
      </Routes>

      {/* <ToDoGallery/>
      <ListGallery/>
      <UserGallery/>
      <SubGallery/> */}
    </main>

  );
}

export default App;
