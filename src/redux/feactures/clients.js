import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    clients: []
}

export const Clients = createSlice({
    name : "clients",
    initialState,
    reducers:{
        addClient: (state, action) => {
            state.clients = [...state.clients , action.payload]
        },
        setClients: (state, action) => {
            state.clients = action.payload
        },
        deleteClients: state => {
            state.clients = []
        },
    }
})

export const {addClient, setClients, deleteClients} = Clients.actions

export default Clients.reducer