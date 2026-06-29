import QuantiaInput from "../components/QuantiaInput";

import {  Box } from "@mui/material";

export default function Quantia(props){
  
    const { 
        quantiaInput = [],
        setQuantiaInput,
        numeros = []
    } = props;
   
    const handleUpdateValue = (index, newVal) => {
        const next = [...quantiaInput];
        const val = next[index] || { value: 0, numero: "" };
        next[index] = {
            ...val,
            value: typeof newVal === 'function' ? newVal(val.value) : newVal
        };
        setQuantiaInput(next);
    };

    const handleUpdateNumero = (index, newNum) => {
        const next = [...quantiaInput];
        const val = next[index] || { value: 0, numero: "" };
        next[index] = {
            ...val,
            numero: newNum
        };
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
                    const item = val || { value: 0, numero: "" };

                    const selectedElsewhere = quantiaInput
                        .filter((_, i) => i !== idx)
                        .map(it => it?.numero)
                        .filter(Boolean);

                    const availableNumeros = numeros.filter(
                        num => num === item.numero || !selectedElsewhere.includes(num)
                    );

                    return (
                        <QuantiaInput
                            key={idx}
                            quantiaInput={item.value}
                            setQuantiaInput={(newVal) => handleUpdateValue(idx, newVal)}
                            selectedNumero={item.numero}
                            setSelectedNumero={(newNum) => handleUpdateNumero(idx, newNum)}
                            numeros={availableNumeros}
                            label={label}
                        />
                    );
                })}
            </Box>            
        </>
    )

}