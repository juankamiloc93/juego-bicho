import React from 'react';
import { styled, FormControl, TextField, Typography } from '@mui/material';

const TextFieldValidationInput = styled(TextField)({
    backgroundColor: 'white',
    "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(158, 9, 135)",
    },   
  },
})

const TypographyErrorValidation = styled(Typography)({
  marginTop: '0.25rem',
  marginBottom: '0.25rem',
  fontSize: '.7em',
  color: '#dc3545',
})

const TexfieldValidation = props => {
    const {
        id,
        label= id,
        type= 'text',
        required= false,
        shemaValidation= [],
        errors,
        register,
        defaultValue='',
        disabled=false,
        multiline=false,
        rows,
        value=null
    } = props

    const porpsField = {
        fullWidth: true,
        required,
        type,
        label: type!=='date'&& type!='time'? label: null,
        id,
        error: errors[id]?true:false,
        defaultValue,
        disabled
    }

    if(multiline){
        porpsField.multiline = true
        porpsField.rows = rows
    }

    if(value){
        porpsField.value = value
    }
    
    return<>
        <FormControl style={{width:'100%', marginTop:8, marginBottom:8}}>
            <TextFieldValidationInput
                {...porpsField}
                {...register(id, shemaValidation[id])}
            />           
            {errors[id] && <TypographyErrorValidation>
                {errors[id].message}
                </TypographyErrorValidation>
            }
        </FormControl>
    </>
}

export { TexfieldValidation }
