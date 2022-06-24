import React from 'react';
import './App.css';
import ToDoGallery from "./components/TodoGallery";
import UserGallery from "./components/UserGallery";
import ListGallery from './components/ListGallery';
import SubGallery from './components/SubGallery';

const App = () => {
  return (
    <div className="App">
      <ToDoGallery/>
      <ListGallery/>
      <UserGallery/>
      <SubGallery/>
    </div>
  );
}

export default App;
