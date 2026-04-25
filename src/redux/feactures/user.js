import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const User = createSlice({
    name : "user",
    initialState,
    reducers:{
        addUser: (state, action) => {
            state.user = action.payload
        },
        deleteUser: state => {
            state.user = false
        },
    }
})

export const {addUser, deleteUser} = User.actions

export default User.reducer