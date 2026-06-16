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
    Alert
} from "@mui/material";
import useDrawsHttp from "@/hooks/http/useDrawsHttp";

export default function Sorteio(props) {
    const { checked, setChecked } = props;
    const { draws: sorteios, loading, error } = useDrawsHttp();

    // Helper to get drawing display name
    const getDrawName = (draw) => {
        return draw.name || draw.nome || draw.description || `Sorteio ${draw.id}`;
    };

    const toggle = (draw) => {
        setChecked((prev) => {
            const isChecked = prev.some((d) => d.id === draw.id);
            if (isChecked) {
                return prev.filter((d) => d.id !== draw.id);
            } else {
                return [...prev, draw];
            }
        });
    };

    const allSelected = sorteios.length > 0 && sorteios.every((s) => checked.some((c) => c.id === s.id));
    const someSelected = checked.length > 0 && !allSelected;

    const toggleAll = () => {
        if (allSelected) {
            setChecked([]);
        } else {
            setChecked([...sorteios]);
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
                        const drawName = getDrawName(option);
                        return (
                            <ListItem key={option.id} disablePadding divider>
                                <ListItemButton onClick={() => toggle(option)} sx={{ py: 1.5 }}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={isChecked}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={drawName} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </>
    );
}