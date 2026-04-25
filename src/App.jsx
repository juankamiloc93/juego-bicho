import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setLogged } from '@/redux/feactures/isLogged';
import { addUser } from '@/redux/feactures/user';

import { Notification } from '@/components/Notification';

import { Box, styled } from '@mui/material';

import  App  from './pages';
import { Login } from './pages/Login';

import { useToken } from '@/hooks/useToken';
import useUserHttp  from '@/hooks/http/useUsuariosHttp'

import Loading from '@/components/Loading';


const RenderAuthentication = () => {

  const { isLogged } = useSelector((state) => state.isLogged)

  const dispatch = useDispatch()
  const setIsLoggedOnRedux = () => {
		dispatch(setLogged())
	}
  const addUserOnRedux = (playLoad) => {
    dispatch(addUser(playLoad))
  }

  const [isLoading, setIsLoading] = useState(true)

  const { getToken, getCurrentUser } = useToken()  

  useEffect(() => {

    getTokenFromLoaclStorage()

  }, [])


  const getTokenFromLoaclStorage = async () => {

    const token = await getToken()
    const user = await getCurrentUser()
    
    if(token){
      setIsLoggedOnRedux()
    }

    if(user){
      addUserOnRedux(user.user)
    }

    setIsLoading(false)
    
  }

  return <>
    <Notification/>  
    {isLoading? 
    <Loading/>
     :
    <>
      { isLogged
      ? <App/> 
      : <Login/> }
    </>
    }
  </>
}

const Index = () => {
  return <PrincipalBox>
      <RenderAuthentication />
    </PrincipalBox>
}

const PrincipalBox = styled(Box)({
  minWidth: 275,
  //width: '100vw',
  minHeight: '100vh',
  background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgb(255, 240, 240) 100%)`,

  display: 'flex',
  flexDirection: 'column'
})

export default Index
