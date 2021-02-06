import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './main';
import Live from './LiveContainers/live';
import LoginPage from './LoginPage/loginpage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>  
        <Route path='/live' component={Live} />
        <Route path='/login' component={LoginPage} />
        <Route path='/' component={Main} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
