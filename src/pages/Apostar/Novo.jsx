import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import Cliente from "./steps/Cliente";
import Modalidade from "./steps/Modalidade";
import Numeros from "./steps/Numeros";
import Grupos from "./steps/Grupos"
import Quantia from "./steps/Quantia";
import Sorteio from "./steps/Sorteio";
import Confirme from "./steps/Confirme";
import { NoMealsOuline } from "@mui/icons-material";

import useBetsHttp from "@/hooks/http/useBetsHttp";


export default function () {

  const { createBet } = useBetsHttp();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Cliente", "Modalidade", "Números", "Quantia", "Tipo de sorteio", "Confirme"];

  const [clientId, setClientId] = useState(null);
  const [modeId, setModeId] = useState(null);
  const [modalidade, setModalidade] = useState(NoMealsOuline)
  const [digitos, setDigitos] = useState(null)
  const [numeros, setNumeros] = useState([])
  const [quantiaInput1, setQuantiaInput1] = useState(0)
  const [quantiaInput2, setQuantiaInput2] = useState(0)
  const [quantiaInput3, setQuantiaInput3] = useState(0)
  const [quantiaInput4, setQuantiaInput4] = useState(0)
  const [quantiaInput5, setQuantiaInput5] = useState(0)
  const [quantiaInput6, setQuantiaInput6] = useState(0)
  const [sorteiochecked, setSorteioChecked] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const drawIds = sorteiochecked.map(item => {
        if (typeof item === 'object' && item !== null) {
          return item.id;
        }
        const match = String(item).match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      }).filter(id => id !== null);

      const numbersPayload = numeros.map(n => parseInt(n, 10));

      const payload = {
        client_id: clientId,
        mode_id: modeId,
        quantiaInput1: Number(quantiaInput1) || 0,
        quantiaInput2: Number(quantiaInput2) || 0,
        quantiaInput3: Number(quantiaInput3) || 0,
        quantiaInput4: Number(quantiaInput4) || 0,
        quantiaInput5: Number(quantiaInput5) || 0,
        quantiaInput6: Number(quantiaInput6) || 0,
        draw_ids: drawIds,
        numbers: numbersPayload,
        hours: selectedHours.map(k => {
          const parts = String(k).split('_');
          return parts.length > 2 ? parts[2] : k;
        })
      };

      try {
        await createBet(payload);
        alert('¡Apuesta realizada con éxito!');
        navigate('/apostar');
      } catch (err) {
        alert('Hubo un error al realizar la apuesta: ' + err.message);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }

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
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeStep === 0 && !clientId}
            >
              {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </Box>
          <Container sx={{ mt: 2, mb: 1, height: 'calc(100vh - 270px)', overflow: 'auto' }}>
            {activeStep === 0 && <Cliente clientId={clientId} setClientId={setClientId} />}
            {activeStep === 1 && <Modalidade handleNext={handleNext} setDigitos={setDigitos} setModalidade={setModalidade} setModeId={setModeId} />}
            {activeStep === 2 && modalidade === 'numeros' && <Numeros digitos={digitos} numeros={numeros} setNumeros={setNumeros} />}
            {activeStep === 2 && modalidade === 'grupo' && <Grupos digitos={digitos} selectedGrupo={numeros} setSelectedGrupo={setNumeros} />}
            {activeStep === 3 && <Sorteio checked={sorteiochecked} setChecked={setSorteioChecked} selectedHours={selectedHours} setSelectedHours={setSelectedHours} />}
            {activeStep === 4 && <Quantia
              quantiaInput1={quantiaInput1}
              setQuantiaInput1={setQuantiaInput1}
              quantiaInput2={quantiaInput2}
              setQuantiaInput2={setQuantiaInput2}
              quantiaInput3={quantiaInput3}
              setQuantiaInput3={setQuantiaInput3}
              quantiaInput4={quantiaInput4}
              setQuantiaInput4={setQuantiaInput4}
              quantiaInput5={quantiaInput5}
              setQuantiaInput5={setQuantiaInput5}
              quantiaInput6={quantiaInput6}
              setQuantiaInput6={setQuantiaInput6}
            />}
            {activeStep === 5 && <Confirme
              clientId={clientId}
              modalidade={modalidade}
              digitos={digitos}
              numeros={numeros}
              quantiaInput1={quantiaInput1}
              quantiaInput2={quantiaInput2}
              quantiaInput3={quantiaInput3}
              quantiaInput4={quantiaInput4}
              quantiaInput5={quantiaInput5}
              quantiaInput6={quantiaInput6}
              sorteiochecked={sorteiochecked}
              selectedHours={selectedHours}
            />}
          </Container>

        </>
      )}
    </Card>);
}