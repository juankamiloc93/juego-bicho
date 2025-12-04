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
import Confirme from "./steps/Confirme";
import { NoMealsOuline } from "@mui/icons-material";

export default function(){

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Modalidade", "Números", "Quantia", "Tipo de sorteio", "Confirme"];
    
    const [modalidade, setModalidade] = useState(NoMealsOuline)  
    const [digitos, setDigitos] = useState(null)
    const [numeros, setNumeros] = useState([])
    const [quantiaInput1, setQuantiaInput1] = useState(0)
    const [quantiaInput2, setQuantiaInput2] = useState(0)
    const [quantiaInput3, setQuantiaInput3] = useState(0)
    const [sorteiochecked, setSorteioChecked] = useState([]);

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
            {activeStep===1 && modalidade==='numeros' && <Numeros digitos={digitos} numeros={numeros} setNumeros={setNumeros}/>}
            {activeStep===1 && modalidade==='grupo' && <Grupos digitos={digitos} selectedGrupo={numeros} setSelectedGrupo={setNumeros}/>}
            {activeStep===2 && <Quantia 
                                  quantiaInput1={quantiaInput1} 
                                  setQuantiaInput1={setQuantiaInput1}
                                  quantiaInput2={quantiaInput2}
                                  setQuantiaInput2={setQuantiaInput2}
                                  quantiaInput3={quantiaInput3}
                                  setQuantiaInput3={setQuantiaInput3}
                                />}
            {activeStep===3 && <Sorteio checked={sorteiochecked} setChecked={setSorteioChecked}/>}
            {activeStep===4 && <Confirme 
                                  modalidade={modalidade}
                                  digitos={digitos}
                                  numeros={numeros}
                                  quantiaInput1={quantiaInput1}
                                  quantiaInput2={quantiaInput2}
                                  quantiaInput3={quantiaInput3}
                                  sorteiochecked={sorteiochecked}
                              />}
          </Container>        
         
        </>
      )}
    </Card>);
}