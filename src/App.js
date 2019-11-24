import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.scss';

//components
import Footer from './components/footer';
import Header from './components/header';
import Content from './components/content';
import TaskDetail from './components/task-detail';
import NotFound from './components/not-found';

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/task/:id" component={TaskDetail} />
        <Route path="/" component={Content} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
      {/* <Content /> */}
      <Footer />
    </div>
  );
}

export default App;
