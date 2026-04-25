import React, { createContext, useContext, useReducer } from "react";
import types from "./types";

import { service } from '../hooks/services/user'

const UserContext = createContext();
const initialState = []

const useUserContext = () => {
    return useContext(UserContext)
}

const addUserHandler = async data => {
    const user =  await service.add(data)
    return user.data.data.user.id
}

const updateUserHandler = async data => {
    await service.update({id:data.id, body:data})
}

const deleteUserHandler = async id => {
    await service.remove({id})
}

const userReducer = (state, action) => {
    switch(action.type) {
        case types.addInitialUsers:{
            return [
                ...action.payload
            ]
        }
        case types.addUser:{
            return [
                ...state,
                ...action.payload
            ]
        }
        case types.addNewUser:{
            const idUser =  addUserHandler(action.payload)
            const newUser = {...action.payload, id:idUser}
            return [
                ...state,
                newUser
            ]
        }
        case types.setUser:{
            const copyState= [...state]
            copyState.forEach(element => {
                if(element.id === action.payload.id){
                    element.name = action.payload.name
                    element.email = action.payload.email
                    element.role = action.payload.role
                    element.state = action.payload.state
                    element.password = action.payload.password === ''
                        ? undefined : action.payload.password
                }
            });
            updateUserHandler(copyState.filter(user => user.id === action.payload.id)[0])
            return copyState
        }
        case types.deleteUser:{
            const copyState= [...state]
            const users = copyState.filter(user => user.id !== action.payload)
            deleteUserHandler(action.payload)
            return users
        }
        default:
            return state;
    }
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return <UserContext.Provider value={{ users:state, dispatch }}>
        { children }
    </UserContext.Provider>
}

export { UserProvider, useUserContext }