import { useState } from "react";

import QuantiaInput from "../components/QuantiaInput";

import { Grid, Button, Typography, Alert, Card, Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function Quantia(){
  
    const [quantiaInput1, setQuantiaInput1] = useState(0)
    const [quantiaInput2, setQuantiaInput2] = useState(0)
    const [quantiaInput3, setQuantiaInput3] = useState(0)

    return(
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,                    
                }}
            > 
                <QuantiaInput quantiaInput={quantiaInput1} setQuantiaInput={setQuantiaInput1}/>
                <QuantiaInput quantiaInput={quantiaInput2} setQuantiaInput={setQuantiaInput2}/>
                <QuantiaInput quantiaInput={quantiaInput3} setQuantiaInput={setQuantiaInput3}/>               
            </Box>            
        </>
    )

}