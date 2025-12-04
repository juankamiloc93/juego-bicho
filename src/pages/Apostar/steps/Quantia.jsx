import QuantiaInput from "../components/QuantiaInput";

import {  Box } from "@mui/material";

export default function Quantia(props){
  
    const {quantiaInput1, setQuantiaInput1, quantiaInput2, setQuantiaInput2, quantiaInput3, setQuantiaInput3} = props
   

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