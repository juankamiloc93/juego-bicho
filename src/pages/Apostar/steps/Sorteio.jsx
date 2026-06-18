import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Radio,
    CircularProgress,
    Alert,
    Chip
} from "@mui/material";
import useDrawsHttp from "@/hooks/http/useDrawsHttp";

export default function Sorteio(props) {
    const { checked, setChecked, selectedHours = [], setSelectedHours } = props;
    const { draws: sorteios, loading, error } = useDrawsHttp();

    // Helper to get drawing display name
    const getDrawName = (draw) => {
        return draw.name || draw.nome || draw.description || `Sorteio ${draw.id}`;
    };

    // Helper to get unique key for draw + hour selection
    const getSelectionKey = (draw, hourStr) => {
        return `${draw.id}_${getDrawName(draw)}_${hourStr}`;
    };

    const toggleDraw = (draw) => {
        const isChecked = checked.some((d) => d.id === draw.id);
        if (isChecked) {
            // Uncheck draw: remove from checked list and remove all its hours
            setChecked([]);
            setSelectedHours([]);
        } else {
            // Check draw: set as the only checked draw and select its first hour if available
            setChecked([draw]);
            if (draw.hours && draw.hours.length > 0) {
                const key = getSelectionKey(draw, draw.hours[0].hour);
                setSelectedHours([key]);
            } else {
                setSelectedHours([]);
            }
        }
    };

    const toggleHour = (draw, hourStr) => {
        const key = getSelectionKey(draw, hourStr);
        const isHourSelected = selectedHours.includes(key);

        if (isHourSelected) {
            // Unselect hour and its draw
            setSelectedHours([]);
            setChecked([]);
        } else {
            // Select this specific hour, and its draw as the only selected draw
            setChecked([draw]);
            setSelectedHours([key]);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, gap: 2 }}>
                <CircularProgress color="primary" />
                <Typography variant="body2" color="text.secondary">
                    Cargando sorteos de la base de datos...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="error">
                    Error al cargar sorteos: {error}
                </Alert>
            </Box>
        );
    }

    if (!sorteios || sorteios.length === 0) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="info">
                    No hay sorteos activos o disponibles.
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Sorteio
            </Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <List sx={{ width: "100%", maxWidth: 480, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
                    {sorteios.map((option) => {
                        const isChecked = checked.some((d) => d.id === option.id);
                        const drawHours = (option.hours || []).map((h) => h.hour);
                        const drawName = getDrawName(option);

                        return (
                            <ListItem key={option.id} disablePadding divider>
                                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1.5 }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <ListItemButton 
                                            onClick={() => toggleDraw(option)} 
                                            sx={{ p: 0, "&:hover": { bgcolor: "transparent" } }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                <Radio 
                                                    edge="start" 
                                                    checked={isChecked}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={drawName} 
                                                primaryTypographyProps={{ fontWeight: 500 }}
                                            />
                                        </ListItemButton>
                                    </Box>
                                    
                                    {/* Hours display */}
                                    {drawHours.length > 0 && (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5, pl: 5 }}>
                                            {drawHours.map((hour) => {
                                                const isHourSelected = selectedHours.includes(getSelectionKey(option, hour));
                                                return (
                                                    <Chip
                                                        key={hour}
                                                        label={hour}
                                                        variant={isHourSelected ? "filled" : "outlined"}
                                                        color={isHourSelected ? "primary" : "default"}
                                                        onClick={() => toggleHour(option, hour)}
                                                        size="small"
                                                        sx={{ 
                                                            borderRadius: 1.5, 
                                                            fontSize: "0.75rem",
                                                            fontWeight: 500,
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                            "&:hover": {
                                                                bgcolor: isHourSelected ? "primary.dark" : "action.hover",
                                                            }
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    )}
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </>
    );
}