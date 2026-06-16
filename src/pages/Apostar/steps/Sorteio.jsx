import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
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
        const drawName = getDrawName(draw);
        const drawKeys = (draw.hours || []).map(h => getSelectionKey(draw, h.hour));
        const isChecked = checked.some((d) => d.id === draw.id);

        if (isChecked) {
            // Uncheck draw: remove from checked list and remove all its hours
            setChecked((prev) => prev.filter((d) => d.id !== draw.id));
            setSelectedHours((prev) => prev.filter((k) => !drawKeys.includes(k)));
        } else {
            // Check draw: add to checked list and add all its hours
            setChecked((prev) => [...prev, draw]);
            setSelectedHours((prev) => {
                const nextHours = [...prev];
                drawKeys.forEach((k) => {
                    if (!nextHours.includes(k)) {
                        nextHours.push(k);
                    }
                });
                return nextHours;
            });
        }
    };

    const toggleHour = (draw, hourStr) => {
        const key = getSelectionKey(draw, hourStr);
        const drawKeys = (draw.hours || []).map(h => getSelectionKey(draw, h.hour));

        setSelectedHours((prev) => {
            let nextHours;
            if (prev.includes(key)) {
                nextHours = prev.filter((k) => k !== key);
            } else {
                nextHours = [...prev, key];
            }

            // Check if any hour key for this draw is still selected
            const hasAnyHour = nextHours.some((k) => drawKeys.includes(k));
            if (hasAnyHour) {
                // Ensure draw is checked
                setChecked((prevChecked) => {
                    if (!prevChecked.some((d) => d.id === draw.id)) {
                        return [...prevChecked, draw];
                    }
                    return prevChecked;
                });
            } else {
                // Ensure draw is unchecked
                setChecked((prevChecked) => prevChecked.filter((d) => d.id !== draw.id));
            }

            return nextHours;
        });
    };

    const allSelected = sorteios.length > 0 && sorteios.every((s) => checked.some((c) => c.id === s.id));
    const someSelected = (checked.length > 0 || selectedHours.length > 0) && !allSelected;

    const toggleAll = () => {
        if (allSelected) {
            setChecked([]);
            setSelectedHours([]);
        } else {
            setChecked([...sorteios]);
            const allKeys = [];
            sorteios.forEach((d) => {
                (d.hours || []).forEach((h) => {
                    const key = getSelectionKey(d, h.hour);
                    if (!allKeys.includes(key)) {
                        allKeys.push(key);
                    }
                });
            });
            setSelectedHours(allKeys);
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
                    <ListItem key="all" disablePadding divider>
                        <ListItemButton onClick={toggleAll} sx={{ py: 1.5 }}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={allSelected}
                                    indeterminate={someSelected}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Todos" 
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {sorteios.map((option) => {
                        const isChecked = checked.some((d) => d.id === option.id);
                        const drawHours = (option.hours || []).map((h) => h.hour);
                        const selectedDrawHoursCount = drawHours.filter((h) => 
                            selectedHours.includes(getSelectionKey(option, h))
                        ).length;
                        const isIndeterminate = selectedDrawHoursCount > 0 && selectedDrawHoursCount < drawHours.length;
                        const isAllHoursChecked = drawHours.length > 0 && selectedDrawHoursCount === drawHours.length;
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
                                                <Checkbox 
                                                    edge="start" 
                                                    checked={isChecked || isAllHoursChecked}
                                                    indeterminate={isIndeterminate}
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