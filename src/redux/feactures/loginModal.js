import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    showLoginModal: false
}

export const LoginModal = createSlice({
    name : "loginModal",
    initialState,
    reducers:{
        showLoginModal: (state) => {
            state.showLoginModal = true
        },
        hideLoginModal: (state) => {
            state.showLoginModal = false
        },
    }
})

export const {showLoginModal, hideLoginModal} = LoginModal.actions

export default LoginModal.reducer