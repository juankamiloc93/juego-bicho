import Tabla from '@/components/Tabla';
import useBetsHttp from '@/hooks/http/useBetsHttp';

import columnas from './columnas';

export default function Apostar() { 

  const {
    bets,
    loading,
    error,
    createBet,
    updateBet,
    deleteBet,
  } = useBetsHttp();    

  return (  
    <>        
      <Tabla
        carregando={loading}
        columnas={columnas}
        registros={bets}
      />
    </>
  );
}