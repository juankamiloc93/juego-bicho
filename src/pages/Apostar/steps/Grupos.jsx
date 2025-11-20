import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Box,
  Grid,
  Typography,
  Alert
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

const grupos = [
    { id: "01", numeros: ["01", "02", "03", "04"], imagen: "aveztruz.png" },
    { id: "02", numeros: ["05", "06", "07", "08"], imagen: "aguila.png" },
    { id: "03", numeros: ["09", "10", "11", "12"], imagen: "burro.png" },
    { id: "04", numeros: ["13", "14", "15", "16"], imagen: "mariposa.png" },
    { id: "05", numeros: ["17", "18", "19", "20"], imagen: "perro.png" },
    { id: "06", numeros: ["21", "22", "23", "24"], imagen: "cabra.png" },
    { id: "07", numeros: ["25", "26", "27", "28"], imagen: "obeja.png" },
    { id: "08", numeros: ["29", "30", "31", "32"], imagen: "camello.png" },
    { id: "09", numeros: ["33", "34", "35", "36"], imagen: "serpiente.png" },
    { id: "10", numeros: ["37", "38", "39", "40"], imagen: "conejo.png" },
    { id: "11", numeros: ["41", "42", "43", "44"], imagen: "caballo.png" },
    { id: "12", numeros: ["45", "46", "47", "48"], imagen: "elefante.png" },
    { id: "13", numeros: ["49", "50", "51", "52"], imagen: "gallo.png" },
    { id: "14", numeros: ["53", "54", "55", "56"], imagen: "gato.png" },
    { id: "15", numeros: ["57", "58", "59", "60"], imagen: "cocodrilo.png" },
    { id: "16", numeros: ["61", "62", "63", "64"], imagen: "leon.png" },
    { id: "17", numeros: ["65", "66", "67", "68"], imagen: "mono.png" },
    { id: "18", numeros: ["69", "70", "71", "72"], imagen: "cerdo.png" },
    { id: "19", numeros: ["73", "74", "75", "76"], imagen: "pavo_real.png" },
    { id: "20", numeros: ["77", "78", "79", "80"], imagen: "pavo.png" },
    { id: "21", numeros: ["81", "82", "83", "84"], imagen: "toro.png" },
    { id: "22", numeros: ["85", "86", "87", "88"], imagen: "tigre.png" },
    { id: "23", numeros: ["89", "90", "91", "92"], imagen: "oso.png" },
    { id: "24", numeros: ["93", "94", "95", "96"], imagen: "venado.png" },
    { id: "25", numeros: ["97", "98", "99", "00"], imagen: "vaca.png" },
  ];

export default function Grupos(props) {

  const { digitos } = props

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState([]);

  const images = import.meta.glob("../../../assets/animales/*", { eager: true });
  
  useEffect(() => {
    if(selectedIds.length >= digitos){
      setSelectedGrupo((prevGrupo)=>
          [...prevGrupo, [selectedIds]]
        )
      setSelectedIds([])
    } 
  }, [selectedIds])

  const toggleSelect = (id) => {    
    setSelectedIds((prev) =>        
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]      
    )      
  };

  const onEliminarNumero = (id) =>  setSelectedGrupo(antigo =>       
    antigo.filter((item, _) => item != id)    
  )

  return (
    <Container sx={{ mt: 4 }}>
      {/*<Box sx={{ mt: 3 }}>
        <Typography variant="body1">
          Seleccionados: {selectedGrupo.join(", ") || "ninguno"}
        </Typography>
      </Box>*/}
      <Grid 
        container
        sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            pt: 5   
        }}
      >
        {selectedGrupo.map((numero, index) => {         
            return <Grid item>
                <Alert
                    sx={{ cursor: "pointer" }}  
                    key={index} 
                    icon={<DeleteIcon fontSize="inherit" />}
                    onClick={() => onEliminarNumero(numero)}
                >
                    {numero.join('')}
                </Alert>
            </Grid>
        })}                        
      </Grid>     
      <Grid container spacing={2} justifyContent="center">
        {grupos.map((grupo) => {
          const imagePath = Object.keys(images).find((path) =>
            path.endsWith(grupo.imagen)
          );
        
          const imgSrc = imagePath ? images[imagePath].default : "";

          const isSelected = selectedIds.includes(grupo.id);

          return (
            <Grid item key={grupo.id} xs={6} sm={4} md={3} lg={2}>
              <Card
                onClick={() => toggleSelect(grupo.id)}
                sx={{
                  position: "relative",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? 6 : 2,
                  border: isSelected ? "3px solid #2e7d32" : "1px solid transparent",
                  backgroundColor: isSelected
                    ? "rgba(46, 125, 50, 0.15)"
                    : "white",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.03)",
                  },
                }}
              >           
              <Box>
                <img
                  src={imgSrc}
                  alt={grupo.id}
                  style={{ width: "100px", height: "auto" }}
                />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {grupo.numeros.join(", ")}
                </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#2e7d32",
                    color: "white",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                {grupo.id}
              </Box>
              </Card>                
            </Grid>
          );
        })}
      </Grid>

      
      
    </Container>
  );
}
