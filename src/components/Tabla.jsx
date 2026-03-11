import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import {
  Table, TableBody, TableCell, TableContainer, TablePagination, Paper,
  TableHead, TableRow, Avatar, Box,
  IconButton, Tooltip
} from '@mui/material';

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Filtros from './Filtros';

function Acciones(props){

  const { registro } = props

  const navigate = useNavigate();

  return <>
    <Tooltip title="Ver">
      <IconButton color="primary" onClick={() => console.log("Ver", registro.id)}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Editar">
      <IconButton color="primary" onClick={() => navigate(`./Editar?id=${registro.id}`)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton color="error" onClick={() => console.log("Eliminar", registro.id)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </>
}

function TipoItem({ tipo, campo }) {
  switch (tipo) {
    case 'texto':
      return <span>{campo}</span>;
    case 'imagen':
      return (
        <Avatar
          variant="rounded"
          src={campo}
          alt={campo}
          sx={{ width: 60, height: 60 }}
        />
      );
    default:
      return null;
  }
}

export default function Tabla(props) {

  const { columnas, registros } = props

  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [orderBy, setOrderBy] = useState(null); // columna actual
  const [order, setOrder] = useState('asc'); // asc o desc

  useEffect(()=> {
    setRegistrosFiltrados(registros);
  }, [registros])

  const filtrar = (filtros) => {
    let filtrados = registros;
    for (let clave in filtros) {
      if (filtros[clave]) {
        const valorFiltro = filtros[clave].toLowerCase();
        filtrados = filtrados.filter(r =>
          String(r[clave]).toLowerCase().includes(valorFiltro)
        );
      }
    }
    setRegistrosFiltrados(filtrados);
  };

  const sortedRegistros = [...registrosFiltrados].sort((a, b) => {
    if (!orderBy) return 0; // si no hay columna seleccionada
    const valA = a[orderBy];
    const valB = b[orderBy];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === 'asc' ? valA - valB : valB - valA;
    }

    return order === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (campo) => {
    if (orderBy === campo) {
      // Si ya está ordenando por esta columna, alternar asc/desc
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      // Cambiar a nueva columna y reiniciar en asc
      setOrderBy(campo);
      setOrder('asc');
    }
  }

  return (
    <>
      <Filtros
        columnas={columnas}
        filtrarFuncion={filtrar}
      />
      <Box sx={{p: 1}}>
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 280px)'}}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: '#ddd' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                {columnas.map((columna) => (
                  <TableCell 
                    key={columna.campo} 
                    sx={{ fontWeight: 'bold', cursor: 'pointer'}} 
                    onClick={() => handleSort(columna.campo)
                  }>
                    {columna.campo}
                    {orderBy === columna.campo && (order === 'asc' ? ' 🔼' : ' 🔽')}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRegistros.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell>
                    <Acciones registro={registro}/>
                  </TableCell>
                  {columnas.map((columna) => (
                    <TableCell key={columna.campo}>
                      <TipoItem
                        tipo={columna.tipo}
                        campo={registro[columna.campo]}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/*<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={registrosFiltrados.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />*/}
        </Box>
      </>
  );
}
