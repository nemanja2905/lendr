import React, { useState, createContext, useMemo, useReducer } from 'react';
import { USER_TYPE } from './TYPES';
import UserReducer from './UserReducer';

const initialStateUser = {
    user: {
        isLoggedIn: false,
    },
};

export const UserContext = createContext(initialStateUser);

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialStateUser);

    function AddUser(user) {
        dispatch({
            type: USER_TYPE.LOGIN,
            payload: user,
        });
    }

    function DeleteUser() {
        dispatch({
            type: USER_TYPE.LOGOUT,
            payload: { isLoggedIn: false },
        });
    }

    function UpdateUser(key, list) {
        dispatch({
            type: USER_TYPE.UPDATE_USER,
            payload: { key, list },
        });
    }
    function UpdateUserDetail(key, list) {
        console.log('UserContext::UpdateUserDetail key=', key, ',list=', list);
        dispatch({
            type: USER_TYPE.UPDATE_USER_DETAIL,
            payload: { key, list },
        });
    }

    const value = useMemo(
        () => ({
            user: state.user,
            AddUser,
            UpdateUser,
            DeleteUser,
            UpdateUserDetail,
        }),
        [state]
    );
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
