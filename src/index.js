import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './main';
import Live from './LiveContainers/live';
import LoginPage from './LoginPage/loginpage';

import history from './utils/history';
import { UserContext } from './context';

const App = () => {
  const [sign, setSign] = useState(null)
  const [username, setUsername] = useState(null)

  return (
    <UserContext.Provider value={{sign, setSign, username, setUsername}}>
      <BrowserRouter>
        <Switch>
          <Route path="/live" history={history} component={Live} />
          <Route path="/login" history={history} component={LoginPage} />
          <Route path="/" history={history} component={Main} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement)