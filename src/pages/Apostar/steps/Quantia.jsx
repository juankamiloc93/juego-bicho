import QuantiaInput from "../components/QuantiaInput";

import {  Box } from "@mui/material";

export default function Quantia(props){
  
    const { 
        quantiaInput = [],
        setQuantiaInput
    } = props;
   
    const handleUpdate = (index, value) => {
        const next = [...quantiaInput];
        next[index] = value;
        setQuantiaInput(next);
    };

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
                {quantiaInput.map((val, idx) => {
                    const label = `${idx + 1}º Premio (Monto ${idx + 1})`;

                    return (
                        <QuantiaInput
                            key={idx}
                            quantiaInput={val}
                            setQuantiaInput={(newVal) => handleUpdate(idx, typeof newVal === 'function' ? newVal(val) : newVal)}
                            label={label}
                        />
                    );
                })}
            </Box>            
        </>
    )

}