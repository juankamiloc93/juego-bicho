import { Grid, Button, Typography, Alert } from "@mui/material";

export default function Modalidade(props) {

  const { handleNext, setDigitos, setModalidade } = props

  const modalidades = [
    {nome: "Grupo", muliplicador: "1xR$18,00", digitos: 0, modalidade: 'grupo'},
    {nome: "Milhar", muliplicador: "1xR$6.000,00", digitos: 4, modalidade: 'numeros'},
    {nome: "Modalidad 3", muliplicador: "1xR$20.00", digitos: 0, modalidade: 'grupo'},
    {nome: "Centena", muliplicador: "1xR$600.00", digitos: 3, modalidade: 'numeros'},
    {nome: "Modalidad 5", muliplicador: "1xR$22.00", digitos: 0, modalidade: 'grupo'},
    {nome: "Dezena", muliplicador: "1xR$23.00", digitos:2, modalidade: 'numeros'},
    {nome: "Modalidad 7", muliplicador: "1xR$24.00", digitos: 0, modalidade: 'grupo'},
    {nome: "Modalidad 8", muliplicador: "1xR$25.00", digitos:0, modalidade: 'numeros'},
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
              onClick={() => {
                setDigitos(modalidade.digitos)
                setModalidade(modalidade.modalidade)
                handleNext()
              }}
              sx={{
                display: "flex",          // activa flexbox
                flexDirection: "row",  // apila en columna
                alignItems: "center",     // centra horizontal
                justifyContent: "space-between", // centra vertical
                gap: 1,                   // espacio entre elementos
                py: 2                     // padding vertical
            }}
            >
              {modalidade.nome}
              <Alert>{modalidade.muliplicador}</Alert>
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
