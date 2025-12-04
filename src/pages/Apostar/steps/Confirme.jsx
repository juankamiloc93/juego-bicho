import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox
} from "@mui/material";


export default function Confirme(props){

    const { 
        modalidade,
        digitos,
        numeros,
        quantiaInput1,
        quantiaInput2,
        quantiaInput3,
        sorteiochecked
    } = props

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Resumen
            </Typography>
            <Box>
                <strong>modalidade: </strong><span>{modalidade}</span>
            </Box>         
            <Box>
                 <strong>numero: </strong>
                {numeros.map((numero, index) => (                             
                    <span>{numero} - </span>               
                ))}
            </Box>
            <Box>
                <strong>quantiaInput1: </strong><span>{quantiaInput1}</span>
            </Box>
             <Box>
                 <strong>quantiaInput2: </strong><span>{quantiaInput2}</span>
            </Box>
             <Box>
                 <strong>quantiaInput3: </strong><span>{quantiaInput3}</span>
            </Box>
            <Box>
                 <strong>sorteiochecked: </strong>
                {sorteiochecked.map((sortio, index) => (                             
                    <span>{sortio} - </span>               
                ))}
            </Box>
        </>
    ) 

}