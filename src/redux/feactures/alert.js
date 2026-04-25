import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    alert: {
        openAlert: false,      
        type: 'success',
        mssg: 'Successful process',
    }
}

export const Alert = createSlice({
    name : "alert",
    initialState,
    reducers:{
        setAlert: (state, action) => {
            state.alert = action.payload
        },
        reseAlert: (state) => {
            state.alert = {
                openAlert: false,      
                type: 'success',
                mssg: 'Successful process',
            }
        }        
    }
})

export const {setAlert, reseAlert} = Alert.actions

export default Alert.reducer