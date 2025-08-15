import { useState } from "react";

import {
  Card,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@mui/material";

export default function(){

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Modalidade", "Números", "Posição, quantia e divisão", "Tipo de sorteio", "Confirme"];

    const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card sx={{p: 2, m: 10 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            ✅ Proceso completado
          </Typography>
          <Button onClick={handleReset}>Reiniciar</Button>
        </>
      ) : (
        <>
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography>Contenido del paso {activeStep + 1}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </Box>
        </>
      )}
    </Card>);
}