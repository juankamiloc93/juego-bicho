import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Grid, Container, Card } from "@mui/material";

import { fileToBase64Helper } from '@/helpers/imagenHelper'

function Campo(props){

    const { columna, register, errors, registro, setValue, getValues, watch } = props

    const imagenActual = watch(columna.campo); // Esto re-renderiza cuando cambia
    
    const changeImagen = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageBase64 = await fileToBase64Helper(file)
        setValue(columna.campo, imageBase64);      
    }

    switch(columna.tipo){
        case 'texto':
            return <>     
                <TextField                                
                    label={columna.campo}
                    variant="outlined"
                    {...register(columna.campo, { required: `El ${columna.campo} es obligatorio` })}
                    defaultValue={registro? registro[columna.campo]: null}
                    //error={!!errors.nombre}
                    //helperText={errors.nombre?.message}
                    fullWidth
                />               
            </>

        case 'imagen':
            return <Box display="flex" flexDirection="column">
                <img src={imagenActual} alt={columna.campo} style={{ maxWidth: "200px", marginBottom: "5px" }} /> 
                <input  
                    type="file"                              
                    label={columna.campo}
                    variant="outlined"
                    onChange={changeImagen}
                    //{...register(columna.campo, { required: `El ${columna.campo} es obligatorio` })}
                    defaultValue={registro? registro[columna.campo]: null}
                    //error={!!errors.nombre}
                    //helperText={errors.nombre?.message}
                    fullWidth
                />                 
            </Box>            
    }

}

export default function Form(props){

    const { columnas, registro, submitFuncion } = props

    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm();    

    const navigate = useNavigate();    

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        submitFuncion(data)       
    };

    const onAtras = () => {
        navigate('./..')
    }

    return(<>
         <Container         
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ pt: 3}}          
        >

            <Card>
                <Box  sx={{ ml: 3}}>
                    <h2 sx={{ mr: 3}}  >{registro? 'Editar': 'Nuevo'} producto</h2>     
                </Box>                
                 <Grid container spacing={2} sx={{ mb: 2}} justifyContent='center'>
                    {columnas.map(columna => 
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ minWidth: 300}}>
                            <Campo 
                                columna={columna} 
                                register={register}
                                error={errors}
                                registro={registro}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                            />
                        </Grid>
                        
                )}
                </Grid>         
                <Grid container spacing={2} sx={{ mb: 2}} justifyContent='center'>
                    <Button onClick={onAtras} type="button" variant="contained" color="primary" sx={{ width: 100}}>
                        Regresar
                    </Button>
                     <Button type="submit" variant="contained" color="success" sx={{ width: 100}}>
                        Crear
                    </Button>
                </Grid>
            </Card>
           
        </Container>
    </>)

}