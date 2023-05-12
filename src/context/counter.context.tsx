"use client";

import { ILoginResponse } from "@/services/authApi";
import React, { Dispatch, createContext, useReducer } from "react";
import cookies from 'react-cookies';

type StateType = {
  userId: number | null;
  jwtToken: string | null;
};

type ActionType = {
  type: string;
  payload: any;
};

const getUserData = (key: string) => {
  const data = cookies.load(`${key}`);
  if (data !== undefined) {
    return data;
  }
  return null;
}

const initialState: StateType = {
  userId: getUserData('userId'),
  jwtToken: getUserData('jwtToken')
};

const SET_USER = 'SET_USER';

export const handleSetUser = (payload: ILoginResponse) => ({
  type: SET_USER,
  payload
})

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SET_USER:
      cookies.save('userId', action.payload.userId, {
        maxAge: 3600*24,
      })
      cookies.save('jwtToken', action.payload.jwtToken, {
        maxAge: 3600*24,
      })
      return { ...state, userId: action.payload.userId, jwtToken: action.payload.jwtToken }
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
