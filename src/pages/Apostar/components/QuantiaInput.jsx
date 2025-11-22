import { Grid, Button, Typography, Alert, Card, Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";


export default function QuantiaInput(props){

    const { quantiaInput, setQuantiaInput } = props

    const onChangeQuantiaInput = (e) => setQuantiaInput(Number(e.target.value))


    const addQuiantiaInput = () => {
        if(quantiaInput<5000){ 
            setQuantiaInput(q => q + 0.5); 
        }   
    }
    
    const subtractQuantiaInput = () => {
         if(quantiaInput>0){
            setQuantiaInput(q => q - 0.5); 
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pt: 5   
                }}
            >
                <FormLabel>Quantia 1 ao 1</FormLabel>
                <TextField  
                    type="number"                              
                    label="Numero"
                    variant="outlined"
                    inputProps={{
                        min: 0,
                        max: 5000,
                        step: 0.5
                    }}
                    value={quantiaInput}   
                    onChange={onChangeQuantiaInput}   
                                
                    sx={{
                        width: 200
                    }}
                />
                <Button
                    variant="contained" 
                    color="error"
                    sx={{
                        width: 50,
                        height: 50
                    }}
                    onClick={subtractQuantiaInput}
                >
                        -
                    </Button>
                <Button 
                    variant="contained"
                    color="success"
                    sx={{
                        width: 50,
                        height: 50
                    }}
                    onClick={addQuiantiaInput}
                >+</Button>
            </Box>
        </>
    )
}