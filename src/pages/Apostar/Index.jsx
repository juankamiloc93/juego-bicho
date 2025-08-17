import { useState } from "react";

import {
  Container,
  Card,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@mui/material";

import Modalidade from "./steps/Modalidade";
import Numeros from "./steps/Numeros";

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
    <Card sx={{
        p: 2,                // padding
        m: 0,                // margin base     
        m: { xs: 0, md: 10 }
  }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography sx={{ display: { xs: "none", md: "block" } }}>
                {label}
              </Typography>              
            </StepLabel>
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
          <Container sx={{ mt: 2, mb: 1 }}>
            {activeStep===0 && <Modalidade/>}
            {activeStep===1 && <Numeros/>}
          </Container>
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