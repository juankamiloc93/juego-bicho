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
import Grupos from "./steps/Grupos"
import Quantia from "./steps/Quantia";
import Sorteio from "./steps/Sorteio";
import { NoMealsOuline } from "@mui/icons-material";

export default function(){

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Modalidade", "Números", "Quantia", "Tipo de sorteio", "Confirme"];
    
    const [modalidade, setModalidade] = useState(NoMealsOuline)  
    const [digitos, setDigitos] = useState(null)

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
        m: { xs: 0, md: 3 }
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
           <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" ,pt: 2 }}>
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
          <Container sx={{ mt: 2, mb: 1, height: 'calc(100vh - 270px)', overflow: 'auto' }}>
            {activeStep===0 && <Modalidade handleNext={handleNext} setDigitos={setDigitos} setModalidade={setModalidade}/>}
            {activeStep===1 && modalidade==='numeros' && <Numeros digitos={digitos}/>}
            {activeStep===1 && modalidade==='grupo' && <Grupos digitos={digitos}/>}
            {activeStep===2 && <Quantia/>}
            {activeStep===3 && <Sorteio/>}
          </Container>        
         
        </>
      )}
    </Card>);
}