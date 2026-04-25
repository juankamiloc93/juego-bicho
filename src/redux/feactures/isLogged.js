import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    IsLogged: false
}

export const IsLogged = createSlice({
    name : "isLogged",
    initialState,
    reducers:{
        setLogged: state => {
            state.isLogged = true
        },
        setNoLogged: state => {
            state.isLogged = false
        },
    }
})

export const {setLogged, setNoLogged} = IsLogged.actions

export default IsLogged.reducer