import { useState } from 'react'

import {
  Container,
  Card,
  Box,
  Button,
  Typography,
  TextField,
  Alert
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

import Teclado from "../components/Teclado";

export default function Numeros(){

    const [numeroInput, setNumeroInput] = useState("")
    const [numeros, setNumeros] = useState([])

    const onClickTeclado = (numero) => setNumeroInput(antigo => '' + antigo + numero)  
    
    const onCllickSorte = () => console.log('sorte')
    
    const onClickInserir = () => {
        if(numeroInput.length>0){
            setNumeros(antigo => [...antigo, numeroInput])
            setNumeroInput("")  
        }
       
    }

    const onBorrarNumero = () => setNumeroInput('')

    return(<>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    pt: 5   
                }}
            >
                {numeros.map((numero) => {
                    return <Alert icon={<DeleteIcon fontSize="inherit" />}>
                        {numero}
                    </Alert>
                })}
                                
            </Box>            
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
                    onChange={(e) => setNumeroInput(Number(e.target.value))}               
                    sx={{
                        width: 200
                    }}
                />
                <Button
                    variant="contained"
                    onClick={onClickInserir}
                >
                   Sorte 
                </Button>
            </Box>
            <Teclado
                onClickTeclado={onClickTeclado}
                onBorrarNumero={onBorrarNumero}
            />
        </>
    )
}