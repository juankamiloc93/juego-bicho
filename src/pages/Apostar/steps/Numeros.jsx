import { useState } from 'react'

import {
  Container,
  Card,
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  Alert
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

import Teclado from "../components/Teclado";

export default function Numeros(porps){

    const { digitos } = porps;

    const [numeroInput, setNumeroInput] = useState("")
    const [numeros, setNumeros] = useState([])

    const onChangeNumeroInput = (e) => {
        if(e.target.value.length<=digitos){
            setNumeroInput(Number(e.target.value));
        }
        
    }

    const onClickTeclado = (numero) => {
        if(('' + numeroInput + numero).length<=digitos){
            setNumeroInput(antigo => '' + antigo + numero)  
        }        
    }
    
    const onCllickSorte = () => {   
        let numero = null    
        do{
            const fin = Math.pow(10, digitos) - 1; // ej: 9999
            numero = Math.floor(Math.random() * (fin + 1)); // entre 0 y 9999            
            numero = String(numero).padStart(digitos, "0"); // Convertir a string con ceros a la izquierda
        }while(numeros.includes(numero))
        setNumeros(antigo => [...antigo, numero])
    }
    
    const onClickInserir = () => {
        if(numeroInput.length===digitos){
            setNumeros(antigo => [...antigo, numeroInput])
            setNumeroInput("")  
        }       
    }


    const onBorrarNumero = () => setNumeroInput('')

    const onEliminarNumero = (id) =>  setNumeros(antigo => antigo.filter((_, index) => index!=id))

    return(<>
            <Grid 
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,                    
                }}
            >
                {numeros.map((numero, index) => {
                    return <Grid item>
                        <Alert
                            sx={{ cursor: "pointer" }}  
                            key={index} 
                            icon={<DeleteIcon fontSize="inherit" />}
                            onClick={() => onEliminarNumero(index)}
                        >
                            {numero}
                        </Alert>
                    </Grid>
                })}
                                
            </Grid>            
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    pt: 5   
                }}
            >
                 <TextField  
                    type="number"                              
                    label="Numero"
                    variant="outlined"
                    value={numeroInput}   
                    onChange={onChangeNumeroInput}               
                    sx={{
                        width: 200
                    }}
                />
                <Button
                    variant="contained"
                    onClick={onCllickSorte}
                    color="success"
                >
                   Sorte 
                </Button>
            </Box>
            <Teclado
                onClickTeclado={onClickTeclado}
                onBorrarNumero={onBorrarNumero}
                onClickInserir={onClickInserir}

            />
        </>
    )
}