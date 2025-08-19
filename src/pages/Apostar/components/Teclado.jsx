import {
  Container,
  Card,
  Box,
  Stepper,
  Button,
  Typography,
  TextField
} from "@mui/material";

export default function Teclado(props){

    const { onClickTeclado, onBorrarNumero, onClickInserir } = props 

    const onClickNumero = (numero) => onClickTeclado(numero)

    return (
        <Box 
            sx={{
                display: "flex",          // activa flexbox
                flexDirection: "column",  // apila en columna
                alignItems: "center",     // centra horizontal
                justifyContent: "space-between", // centra vertical
                //gap: 1,                   // espacio entre elementos
                py: 7                     // padding vertical
            }}
        >          
            <Box>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(1)}
                >
                   1 
                </Button>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(2)}
                >
                   2 
                </Button>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(3)}
                >
                   3 
                </Button> 
            </Box>
            <Box>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(4)}
                >
                   4
                </Button>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(5)}
                >
                   5
                </Button>
                <Button
                    variant="contained"
                   sx={{m:1, px:4, py:3}}
                   onClick={() => onClickNumero(6)}
                >
                   6 
                </Button>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(7)}
                >
                   7 
                </Button>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(8)}
                >
                   8 
                </Button>
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={() => onClickNumero(9)}
                >
                   9
                </Button> 
            </Box>
            <Box>
                 <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={onBorrarNumero}
                >
                   {"<="}
                </Button> 
                <Button
                    variant="contained"
                   sx={{m:1, px:4, py:3}}
                >
                   0
                </Button> 
                <Button
                    variant="contained"
                    sx={{m:1, px:4, py:3}}
                    onClick={onClickInserir}
                >
                   0
                </Button> 
            </Box>
        </Box>
    )

}