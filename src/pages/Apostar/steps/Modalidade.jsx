import { Grid, Button, Typography, Alert } from "@mui/material";

export default function Modalidade() {
  const modalidades = [
    {modalidade: "Modalidad 1", muliplicador: "1xR$18.00"},
    {modalidade: "Modalidad 2", muliplicador: "1xR$19.00"},
    {modalidade: "Modalidad 3", muliplicador: "1xR$20.00"},
    {modalidade: "Modalidad 4", muliplicador: "1xR$21.00"},
    {modalidade: "Modalidad 5", muliplicador: "1xR$22.00"},
    {modalidade: "Modalidad 6", muliplicador: "1xR$23.00"},
    {modalidade: "Modalidad 7", muliplicador: "1xR$24.00"},
    {modalidade: "Modalidad 8", muliplicador: "1xR$25.00"},
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Modalidade
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {modalidades.map((modalidade, index) => (
          <Grid item size={{ xs: 12, md: 6 }} key={index}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => console.log(`Seleccionaste ${modalidade.modalidade}`)}
              sx={{
                display: "flex",          // activa flexbox
                flexDirection: "row",  // apila en columna
                alignItems: "center",     // centra horizontal
                justifyContent: "space-between", // centra vertical
                gap: 1,                   // espacio entre elementos
                py: 2                     // padding vertical
            }}
            >
              {modalidade.modalidade}
              <Alert>{modalidade.muliplicador}</Alert>
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
