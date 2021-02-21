import React, { Context } from "react";

export const SignContext = React.createContext({
  sign: null,
  setSign: (sign) => {},
});

export const UserContext = React.createContext({
  sign: null,
  setSign: (sign) => {},
  username: null,
  setUsername: (username) => {},
});
