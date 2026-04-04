import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Grid, TextField, Box, Button
} from '@mui/material';

function Filtros(props){

  const { columnas, filtrarFuncion } = props

  const navigate = useNavigate();

  const estadoInicialFiltors = columnas.reduce((acc, { campo }) => {
    if (!(campo in acc)) { // evita sobreescribir si está repetido
      acc[campo] = "";
    }
    return acc;
  }, {});

  const [filtros, setFiltros] = useState(estadoInicialFiltors);

  const handleChangeFiltros = (e) => {
    const { name, value } = e.target;  

    setFiltros((prev) => ({
      ...prev,           // copiamos lo que ya había
      [name]: value      // actualizamos solo el campo modificado
    }));
  };

  const filtrar = () => {
    filtrarFuncion(filtros)
  }

  const limpiar = () => {
    setFiltros(estadoInicialFiltors)
    filtrarFuncion(estadoInicialFiltors)
  }

  const nuevo = () => {
    navigate('./novo')
  }

  return(
    <>
      <Box display="flex" justifyContent="start" alignItems="center" m={1}>
        <Grid container spacing={2} sx={{ mb: 2, flexWrap: 'nowrap', overflowX: 'auto' }}>
        {columnas.map((columna) => (
          columna.tipo === 'texto' &&
            <Grid item xs={12} sm={3} sx={{minWidth: 150, mt: 1}} >
              <TextField
                fullWidth
                label={`Filtrar por ${columna.campo}`}
                variant="filled"
                name={columna.campo}
                value= {filtros[columna.campo]}
                onChange={handleChangeFiltros}
              />
            </Grid>    
        ))}  
        </Grid>          
      </Box>
      <Box display="flex" justifyContent="start" alignItems="center">
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={filtrar}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={limpiar}>
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={nuevo}>
              Nuevo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Filtros;