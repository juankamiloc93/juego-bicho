import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    showUpdatePasswordModal: false
}

export const UpdatePasswordModal = createSlice({
    name : "loginModal",
    initialState,
    reducers:{
        showUpdatePasswordModal: (state) => {
            state.showUpdatePasswordModal = true
        },
        hideUpdatePasswordModal: (state) => {
            state.showUpdatePasswordModal = false
        },
    }
})

export const {showUpdatePasswordModal, hideUpdatePasswordModal} = UpdatePasswordModal.actions

export default UpdatePasswordModal.reducer