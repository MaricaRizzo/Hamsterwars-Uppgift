import React from 'react';
import './App.css';
import HamsterGallery from './components/gallery/Gallery';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Hamsterwars</h1>
        <nav>
          Router links
        </nav>
      </header>
      <main>
        Switch components

        <HamsterGallery />
      </main>
    </div>
  );
}

export default App;
