import { useState } from "react";

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

export default function Sorteio(props){

    const {checked, setChecked} = props;

    const sorteios = [
        {nome: "Sorteio 1"},
        {nome: "Sorteio 2"},
        {nome: "Sorteio 3"},
        {nome: "Sorteio 4",},
        {nome: "Sorteio 5",},
        {nome: "Sorteio 6"},
        {nome: "Sorteio 7"},
        {nome: "Sorteio 8"},
    ];  

    const toggle = (value) => {
        setChecked((prev) =>
        prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value]
        );
    };

    const allSelected = checked.length === sorteios.length;
    const someSelected = checked.length > 0 && checked.length < sorteios.length;

    const toggleAll = () => {
        if (allSelected) {
            setChecked([]);
        } else {
            setChecked(sorteios.map(s => s.nome)); 
        }
    };

    return(
        <>
            <Typography variant="h6" gutterBottom>
                Sorteio
            </Typography>
            <Box  sx={{
                    display: "flex",
                    justifyContent: "center",                           
                }}>
                <List>
                    <ListItem key="all" disablePadding>
                        <ListItemButton onClick={toggleAll}>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={allSelected}
                                indeterminate={someSelected}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Todas" />
                        </ListItemButton>
                    </ListItem>
                    {sorteios.map((option) => (
                        <ListItem key={option.nome} disablePadding>
                            <ListItemButton onClick={() => toggle(option.nome)}>
                                <ListItemIcon>
                                      <Checkbox edge="start" checked={checked.includes(option.nome)}/>
                                </ListItemIcon>
                                <ListItemText primary={option.nome} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            
        </>
    )

}