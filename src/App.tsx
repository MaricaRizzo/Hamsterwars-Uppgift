import React from 'react';
import { Switch } from 'react-router';
import './App.css';
import HamsterGallery from './components/gallery/Gallery';
import Home from './components/home/Home';
import Game from './components/game/Game';
import { Link, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Hamsterwars</h1>
        <nav>
          <Link to="/" className="navLink">Home</Link>
          <Link to="/game" className="navLink">Play</Link>
          <Link to="/gallery" className="navLink">Gallery</Link>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/game"> <Game /> </Route>
          <Route path="/gallery"> <HamsterGallery /> </Route>
          <Route path="/"> <Home /> </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
