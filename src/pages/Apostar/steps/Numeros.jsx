import {
  Container,
  Card,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField
} from "@mui/material";

export default function Numeros(){
    return(<>            
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
                    sx={{
                        width: 200
                    }}
                />
                <Button
                    variant="contained"
                >
                   Sorte 
                </Button>
            </Box>
            <box>
                <Button
                    variant="contained"
                >
                   1 
                </Button>
                <Button
                    variant="contained"
                >
                   2 
                </Button>
                <Button
                    variant="contained"
                >
                   3 
                </Button> 
            </box>
            <box>
                     <Button
                    variant="contained"
                >
                   4
                </Button>
                <Button
                    variant="contained"
                >
                   5
                </Button>
                <Button
                    variant="contained"
                >
                   6 
                </Button>
            </box>
                     <Button
                    variant="contained"
                >
                   7 
                </Button>
                <Button
                    variant="contained"
                >
                   8 
                </Button>
                <Button
                    variant="contained"
                >
                   9
                </Button>
            <box>

            </box>
        </>
    )
}