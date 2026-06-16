import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PersonIcon from "@mui/icons-material/Person";

const LotteryBall = ({ number, index }) => {
    const gradients = [
        "radial-gradient(circle at 30% 30%, #ff5722 0%, #ff9800 100%)", // Orange-Red
        "radial-gradient(circle at 30% 30%, #4caf50 0%, #8bc34a 100%)", // Green
        "radial-gradient(circle at 30% 30%, #2196f3 0%, #00bcd4 100%)", // Blue
        "radial-gradient(circle at 30% 30%, #9c27b0 0%, #e91e63 100%)", // Pink-Purple
        "radial-gradient(circle at 30% 30%, #ffeb3b 0%, #ffc107 100%)", // Gold
        "radial-gradient(circle at 30% 30%, #009688 0%, #4db6ac 100%)"  // Teal
    ];
    
    const gradient = gradients[index % gradients.length];
    
    return (
        <Box
            sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: gradient,
                boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.15)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                border: "2px solid rgba(255,255,255,0.7)",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-3px) scale(1.08)",
                    boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.4), 0 8px 14px rgba(0,0,0,0.22)",
                }
            }}
        >
            {number}
        </Box>
    );
};

export default function Confirme(props){

    const { 
        clientId,
        modalidade,
        digitos,
        numeros = [],
        quantiaInput1 = 0,
        quantiaInput2 = 0,
        quantiaInput3 = 0,
        quantiaInput4 = 0,
        quantiaInput5 = 0,
        quantiaInput6 = 0,
        sorteiochecked = [],
        selectedHours = []
    } = props;

    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        if (clientId) {
            const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
            const encontrado = clientesGuardados.find(c => String(c.id) === String(clientId));
            if (encontrado) {
                setCliente(encontrado);
            }
        }
    }, [clientId]);

    const quantiaList = [
        { label: "1º Premio (Monto 1)", value: Number(quantiaInput1) || 0 },
        { label: "2º Premio (Monto 2)", value: Number(quantiaInput2) || 0 },
        { label: "3º Premio (Monto 3)", value: Number(quantiaInput3) || 0 },
        { label: "4º Premio (Monto 4)", value: Number(quantiaInput4) || 0 },
        { label: "5º Premio (Monto 5)", value: Number(quantiaInput5) || 0 },
        { label: "1º al 5º (Monto 6)", value: Number(quantiaInput6) || 0 }
    ];

    const activeQuantias = quantiaList.filter(q => q.value > 0);
    const subtotal = quantiaList.reduce((acc, curr) => acc + curr.value, 0);
    const totalSorteos = Array.isArray(sorteiochecked) ? sorteiochecked.length : 0;
    const multiplicadorSorteos = totalSorteos || 1;
    const grandTotal = subtotal * multiplicadorSorteos;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(val);
    };

    const getModalidadeLabel = (mode) => {
        if (!mode) return "No seleccionada";
        if (mode.toLowerCase() === 'grupo') return "Grupo";
        if (mode.toLowerCase() === 'numeros') return "Números";
        return mode.charAt(0).toUpperCase() + mode.slice(1);
    };

    return (
        <Box sx={{ py: 1, maxWidth: 960, mx: "auto" }}>
            {/* Centered Header */}
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1 }}>
                <ReceiptLongIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                    <Typography variant="h5" fontWeight="700" color="text.primary">
                        Resumen de la Apuesta
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Verifique todos los detalles de su jugada antes de finalizar.
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3} justifyContent="center">
                {/* Left Column: Game Details */}
                <Grid item xs={12} md={7}>
                    <Stack spacing={3}>
                        {/* Selected Client Card */}
                        {cliente && (
                            <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', borderLeft: "5px solid #2e7d32" }}>
                                <Box sx={{ 
                                    bgcolor: 'success.main', 
                                    color: 'success.contrastText', 
                                    px: 3, 
                                    py: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <PersonIcon fontSize="small" />
                                    <Typography fontWeight="600">Cliente de la Apuesta</Typography>
                                </Box>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="subtitle1" fontWeight="700" color="text.primary">
                                        {cliente.name}
                                    </Typography>
                                    <Grid container spacing={1} sx={{ mt: 1 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Email:</strong> {cliente.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Teléfono:</strong> {cliente.phone}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="success.main" fontWeight="700">
                                                Saldo: R$ {parseFloat(cliente.balance || 0).toFixed(2)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}

                        {/* Modality & Numbers Card */}
                        <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                            <Box sx={{ 
                                bgcolor: 'primary.main', 
                                color: 'primary.contrastText', 
                                px: 3, 
                                py: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <CasinoIcon fontSize="small" />
                                <Typography fontWeight="600">Modalidad y Selección</Typography>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                <Stack spacing={2.5}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="text.secondary" fontWeight="500">
                                            Modalidad elegida:
                                        </Typography>
                                        <Chip 
                                            label={getModalidadeLabel(modalidade)} 
                                            color="secondary" 
                                            size="medium"
                                            sx={{ fontWeight: 'bold', px: 1 }}
                                        />
                                    </Box>
                                    
                                    {digitos !== null && digitos !== undefined && (
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body2" color="text.secondary" fontWeight="500">
                                                Dígitos por número:
                                            </Typography>
                                            <Chip 
                                                label={`${digitos} dígitos`} 
                                                variant="outlined" 
                                                size="small"
                                            />
                                        </Box>
                                    )}

                                    <Divider />

                                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            fontWeight="500" 
                                            sx={{ mb: 1.5, textAlign: 'left' }}
                                        >
                                            Números Jugados:
                                        </Typography>
                                        
                                        {numeros.length === 0 ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'warning.main', py: 1 }}>
                                                <WarningAmberIcon fontSize="small" />
                                                <Typography variant="body2">No se han seleccionado números.</Typography>
                                            </Box>
                                        ) : (
                                            <Box sx={{ 
                                                display: 'flex', 
                                                flexWrap: 'wrap', 
                                                gap: 1.5,
                                                py: 1,
                                                justifyContent: 'center' // Centered the lottery balls
                                            }}>
                                                {numeros.map((numero, idx) => (
                                                    <LotteryBall key={idx} number={numero} index={idx} />
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Selected Draws Card */}
                        <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                            <Box sx={{ 
                                bgcolor: 'info.main', 
                                color: 'info.contrastText', 
                                px: 3, 
                                py: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <EventAvailableIcon fontSize="small" />
                                <Typography fontWeight="600">Sorteos Seleccionados</Typography>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                {sorteiochecked.length === 0 ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'warning.main' }}>
                                        <WarningAmberIcon fontSize="small" />
                                        <Typography variant="body2">No ha seleccionado ningún sorteo.</Typography>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}> {/* Centered chips */}
                                         {sorteiochecked.map((sortio, index) => {
                                             const name = typeof sortio === 'object' && sortio !== null
                                                 ? (sortio.name || sortio.nome || sortio.description || `Sorteio ${sortio.id}`)
                                                 : String(sortio);
                                             return (
                                                 <Chip
                                                     key={index}
                                                     icon={<CalendarTodayIcon fontSize="small" />}
                                                     label={name}
                                                     variant="outlined"
                                                     color="info"
                                                     sx={{ borderRadius: 2, fontWeight: 500 }}
                                                 />
                                             );
                                         })}
                                    </Box>
                                )}
                                 {selectedHours && selectedHours.length > 0 && (
                                     <>
                                         <Divider sx={{ my: 2 }} />
                                         <Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ mb: 1, textAlign: 'center' }}>
                                             Horarios Seleccionados:
                                         </Typography>
                                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                             {selectedHours.map((hour, idx) => {
                                                 const parts = String(hour).split('_');
                                                 const displayName = parts.length > 2 ? `${parts[1]} (${parts[2]})` : String(hour);
                                                 return (
                                                     <Chip
                                                         key={idx}
                                                         label={displayName}
                                                         variant="filled"
                                                         color="info"
                                                         size="small"
                                                         sx={{ borderRadius: 1.5, fontWeight: 500 }}
                                                     />
                                                 );
                                             })}
                                         </Box>
                                     </>
                                 )}
                             </CardContent>
                        </Card>
                    </Stack>
                </Grid>

                {/* Right Column: Premium Receipt Card */}
                <Grid item xs={12} md={5}>
                    <Paper 
                        elevation={4} 
                        sx={{ 
                            borderRadius: 4, 
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid',
                            borderColor: 'divider',
                            background: '#fafafa',
                        }}
                    >
                        {/* Decorative Top Accent */}
                        <Box sx={{ 
                            height: 6, 
                            background: 'linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)' 
                        }} />

                        {/* Receipt Title */}
                        <Box sx={{ px: 3, pt: 3, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <PaymentsIcon color="success" />
                                <Typography variant="h6" fontWeight="bold" color="text.primary">
                                    Resumen de Pago
                                </Typography>
                            </Box>
                            <LocalPlayIcon sx={{ color: 'text.disabled', opacity: 0.5 }} />
                        </Box>

                        <Divider sx={{ mx: 3, my: 1 }} />

                        <Box sx={{ px: 3, py: 2 }}>
                            {activeQuantias.length === 0 ? (
                                <Box sx={{ py: 3, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        No has ingresado ningún monto de apuesta.
                                    </Typography>
                                </Box>
                            ) : (
                                <TableContainer component={Box}>
                                    <Table size="small" aria-label="bet quantities table">
                                        <TableBody>
                                            {activeQuantias.map((q, idx) => (
                                                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row" sx={{ px: 0, py: 1.2, color: 'text.secondary', fontWeight: 500 }}>
                                                        {q.label}
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ px: 0, py: 1.2, fontWeight: '600', color: 'text.primary' }}>
                                                        {formatCurrency(q.value)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            <Divider sx={{ my: 2 }} />

                            {/* Subtotal & Sorteos Multiplier info */}
                            <Stack spacing={1} sx={{ mb: 2 }}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Subtotal (por sorteo):
                                    </Typography>
                                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                                        {formatCurrency(subtotal)}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Sorteos multiplicadores:
                                    </Typography>
                                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                                        x {multiplicadorSorteos}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Grand Total Footer */}
                        <Box sx={{ 
                            p: 3, 
                            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                            color: 'white',
                            borderTop: '1px dashed rgba(255,255,255,0.2)'
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1, opacity: 0.85, fontWeight: '700' }}>
                                        Total a Pagar
                                    </Typography>
                                    <Typography variant="h4" fontWeight="800" sx={{ mt: 0.5 }}>
                                        {formatCurrency(grandTotal)}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        bgcolor: 'rgba(255,255,255,0.2)', 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 2,
                                        fontSize: '0.85rem',
                                        border: '1.5px solid rgba(255,255,255,0.4)',
                                    }} 
                                >
                                    LISTO
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}