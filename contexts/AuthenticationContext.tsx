import React from 'react';
import User from '../model/User';

export default class AuthenticationState {
  constructor(fields?: { user?: User, token?: string, expirationDate?: Date }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

    user!: User;
    token!: string;
    expirationDate!: Date;
};

export const AuthenticationContext = React.createContext({
  setAuthenticationState: (auth: AuthenticationState) => {},
  authenticationState: new AuthenticationState()
});