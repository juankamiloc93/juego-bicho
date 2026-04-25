import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux'
import { addUser } from '@/redux/feactures/user';
import { setLogged } from '@/redux/feactures/isLogged';
import { setAlert } from '@/redux/feactures/alert';

import { Box, styled, Button, Typography } from '@mui/material';

import { TexfieldValidation } from '@/components/textFieldValidation';

import Loading from '@/components/Loading';

import { login } from '@/hooks/http/login';
import { useToken } from '@/hooks/useToken';
import useUserHttp  from '@/hooks/http/useUsuariosHttp'


const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { setToken, setCurrentUser } = useToken()

  const dispatch = useDispatch()
  const setUserOnRedux = (payLoad) => {
		dispatch(addUser(payLoad))
	}
  const setLoggedOnRedux = (payLoad) => {
		dispatch(setLogged(payLoad))
	}
  const setAlertProps = (payLoad) => {
    dispatch(setAlert(payLoad))
  }

  const [isLoading, setIsLoading] = useState(false)
    
  const loginShema = {
    email: {
        required: { value: true, message: 'Usuario requerido' },
        minLength: { value: 5, message: 'Mínimo 5 caracteres' },
        maxLength:{ value: 60, message: 'Máximo 60 caracteres'}
    },
    password: {
        required: { value: true, message: 'Contraseña requerida' },
        minLength: { value: 5, message: 'Mínimo 5 caracteres' },
        maxLength:{ value: 60, message: 'Máximo 60 caracteres' }
    },
  };

  const onSubmit = async data => {
    setIsLoading(true)
    await login({body:data})
      .then( async res => {
        
        await setToken(res.data.access_token)
        //await setCurrentUser(res.data)
        //setUserOnRedux(res.data.user)        
        setLoggedOnRedux()    

      })
      .catch(err => {

        setAlertProps({
          openAlert: true,      
          type: 'error',
          mssg: err?.response?.data?.error,
        })
       
      })
    reset()
    setIsLoading(false)
  }

  return (
    <>      
      <MainBox id='mainBoxLogin' >
        <InternalBox>
          <LeftBox id='leftBoxLogin' sx={{ boxShadow: 3, display: { xs: 'none', md: 'flex' }, width: { xs: '100%', md:'40%'} }}/>
          <RightBox sx={{ boxShadow: 3, width: { xs: '100%', md:'60%'}}}>
            <TopBox>
              <TypographyLogo>VISITAS MÉDICAS</TypographyLogo>
            </TopBox>
            <BottomBox>
            {isLoading? <Loading/> :
              <form onSubmit={handleSubmit(onSubmit)}>
                <TexfieldValidation
                  required
                  id= "email"
                  label='Usuario'
                  shemaValidation= {loginShema}
                  errors= {errors}
                  register= {register}
                />
                <TexfieldValidation
                    required
                    id= "password"
                    label= "Contraseña"
                    type= "password"
                    shemaValidation= {loginShema}
                    errors= {errors}
                    register= {register}
                />
                <InputButton size="large" variant="contained" color="success" type="submit" >signIn</InputButton>
              </form>}
            </BottomBox>
          </RightBox>
        </InternalBox>     
      </MainBox>
    </>
  )
}

const MainBox = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const InternalBox = styled(Box)({
  width: 700,
  height: 400,
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'row'
})

const LeftBox = styled(Box)({
  borderTopLeftRadius: '16px',
  borderBottomLeftRadius:'16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const TypographyLogo = styled(Typography)({
  color: '#000',
  marginTop: '40px',
  fontWeight: '550',
  fontSize: '1.5rem'
})

const RightBox = styled(Box)({
  backgroundColor: 'rgba(220, 220, 220, 0.8)',
  borderTopRightRadius: '16px',
  borderBottomRightRadius:'16px',
  display: 'flex',
  flexDirection: 'column',
  padding: 20
})

const BottomBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center', 
  //backgroundColor: 'rgba(255, 255, 255, 0.6)'
})

const TopBox = styled(Box)({
  width: '100%',
  height: '25%',
  marginBottom: '24px'
})

const InputButton = styled(Button)({
  marginTop: 16,
  width: '50%',
  marginLeft: 4,
  backgroundImage: `linear-gradient(rgb(158, 9, 135) , rgb(63, 0, 97))`,
})

export { Login }