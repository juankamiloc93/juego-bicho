import { configureStore } from '@reduxjs/toolkit'

import isLogged from './feactures/isLogged'
import user from './feactures/user'
import alert from './feactures/alert'
import loginModal from './feactures/loginModal'
import updatePasswordModal from './feactures/updatePasswordModal'
import clients from './feactures/clients'

export const store = configureStore({
  reducer: {		
    isLogged,
    user,
    alert,
    loginModal,
    updatePasswordModal,
    clients
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})