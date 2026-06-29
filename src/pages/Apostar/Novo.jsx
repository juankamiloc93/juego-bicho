import { useState, useEffect } from "react";
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
  const [quantiaInput, setQuantiaInput] = useState(
    Array(5).fill(null).map(() => ({ value: 0, numero: "" }))
  );
  const [sorteiochecked, setSorteioChecked] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);

  const selectedDraw = sorteiochecked[0];
  const positionsCount = selectedDraw ? (selectedDraw.positions ?? selectedDraw.position ?? 5) : 5;

  useEffect(() => {
    setQuantiaInput(prev => {
      const targetLength = positionsCount;
      if (prev.length === targetLength) return prev;
      
      const newQuantias = Array(targetLength).fill(null).map(() => ({ value: 0, numero: "" }));
      for (let i = 0; i < Math.min(prev.length, targetLength); i++) {
        newQuantias[i] = prev[i] || { value: 0, numero: "" };
      }
      return newQuantias;
    });
  }, [positionsCount]);

  useEffect(() => {
    if (numeros.length > 0) {
      setQuantiaInput(prev => 
        prev.map((item) => {
          if (item.numero && !numeros.map(String).includes(String(item.numero))) {
            return { ...item, numero: "" };
          }
          return item;
        })
      );
    } else {
      setQuantiaInput(prev => 
        prev.map(item => ({ ...item, numero: "" }))
      );
    }
  }, [numeros]);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const drawIds = sorteiochecked.map(item => {
        if (typeof item === 'object' && item !== null) {
          return item.id;
        }
        const match = String(item).match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      }).filter(id => id !== null);

      const betsByNumber = {};

      if (Array.isArray(quantiaInput)) {
        const pCount = quantiaInput.length;
        for (let i = 0; i < pCount; i++) {
          const item = quantiaInput[i];
          const val = Number(item?.value) || 0;
          if (val > 0) {
            const num = item?.numero || (numeros[0] ? String(numeros[0]) : "");
            if (num) {
              if (!betsByNumber[num]) {
                betsByNumber[num] = {
                  quantiaInput1: 0,
                  quantiaInput2: 0,
                  quantiaInput3: 0,
                  quantiaInput4: 0,
                  quantiaInput5: 0,
                  quantiaInput6: 0,
                };
              }
              const key = `quantiaInput${i + 1}`;
              if (i < 5) {
                betsByNumber[num][key] = val;
              }
            }
          }
        }
      }

      const uniqueNumbersToBet = Object.keys(betsByNumber);

      if (uniqueNumbersToBet.length === 0) {
        const payload = {
          client_id: clientId,
          mode_id: modeId,
          quantiaInput1: 0,
          quantiaInput2: 0,
          quantiaInput3: 0,
          quantiaInput4: 0,
          quantiaInput5: 0,
          quantiaInput6: 0,
          draw_ids: drawIds,
          numbers: numeros.map(n => parseInt(n, 10)),
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
        try {
          for (const num of uniqueNumbersToBet) {
            const payload = {
              client_id: clientId,
              mode_id: modeId,
              ...betsByNumber[num],
              draw_ids: drawIds,
              numbers: [parseInt(num, 10)],
              hours: selectedHours.map(k => {
                const parts = String(k).split('_');
                return parts.length > 2 ? parts[2] : k;
              })
            };
            await createBet(payload);
          }
          alert('¡Todas las apuestas fueron realizadas con éxito!');
          navigate('/apostar');
        } catch (err) {
          alert('Hubo un error al realizar alguna de las apuestas: ' + err.message);
        }
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
              quantiaInput={quantiaInput}
              setQuantiaInput={setQuantiaInput}
              numeros={numeros}
            />}
            {activeStep === 5 && <Confirme
              clientId={clientId}
              modalidade={modalidade}
              digitos={digitos}
              numeros={numeros}
              quantiaInput={quantiaInput}
              sorteiochecked={sorteiochecked}
              selectedHours={selectedHours}
            />}
          </Container>

        </>
      )}
    </Card>);
}