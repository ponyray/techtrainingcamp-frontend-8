import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './main';
import Live from './LiveContainers/live';
import LoginPage from './LoginPage/loginpage';

import history from './utils/history';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>  
        <Route path='/live' history={history} component={Live} />
        <Route path='/login' history={history} component={LoginPage} />
        <Route path='/' history={history} component={Main} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
