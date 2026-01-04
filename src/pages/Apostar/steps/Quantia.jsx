import QuantiaInput from "../components/QuantiaInput";

import {  Box } from "@mui/material";

export default function Quantia(props){
  
    const { 
        quantiaInput1,
        setQuantiaInput1,
        quantiaInput2,
        setQuantiaInput2,
        quantiaInput3, 
        setQuantiaInput3,
        quantiaInput4, 
        setQuantiaInput4,
        quantiaInput5, 
        setQuantiaInput5,
        quantiaInput6, 
        setQuantiaInput6,
    } = props
   

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
                <QuantiaInput quantiaInput={quantiaInput4} setQuantiaInput={setQuantiaInput4}/>
                <QuantiaInput quantiaInput={quantiaInput5} setQuantiaInput={setQuantiaInput5}/>
                <QuantiaInput quantiaInput={quantiaInput6} setQuantiaInput={setQuantiaInput6}/>               
            </Box>            
        </>
    )

}