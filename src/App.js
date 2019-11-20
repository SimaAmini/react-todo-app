import React from 'react';
import './App.scss';
import Footer from './components/footer';
import Header from './components/header';
import Content from './components/content';

function App() {
  return (
    <div className="container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
