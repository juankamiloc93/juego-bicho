import { Grid, Button, Typography, Alert, Card, Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from "@mui/material";


export default function QuantiaInput(props) {

    const {
        quantiaInput,
        setQuantiaInput,
        selectedNumero = "",
        setSelectedNumero,
        numeros = [],
        label = "Numero"
    } = props

    const onChangeQuantiaInput = (e) => setQuantiaInput(Number(e.target.value))


    const addQuiantiaInput = () => {
        if (quantiaInput < 5000) {
            setQuantiaInput(q => q + 0.5);
        }
    }

    const subtractQuantiaInput = () => {
        if (quantiaInput > 0) {
            setQuantiaInput(q => q - 0.5);
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pt: 5
                }}
            >
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id={`select-numero-label-${label}`}>Número</InputLabel>
                    <Select
                        labelId={`select-numero-label-${label}`}
                        value={selectedNumero}
                        label="Número"
                        onChange={(e) => setSelectedNumero && setSelectedNumero(e.target.value)}
                        disabled={numeros.length === 0}
                    >
                        {numeros.length === 0 ? (
                            <MenuItem value="">
                                <em>Sin números</em>
                            </MenuItem>
                        ) : (
                            numeros.map((num, i) => (
                                <MenuItem key={i} value={num}>
                                    {num}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

                <TextField
                    type="number"
                    label={label}
                    variant="outlined"
                    inputProps={{
                        min: 0,
                        max: 5000,
                        step: 0.5
                    }}
                    value={quantiaInput}
                    onChange={onChangeQuantiaInput}
                    disabled={!selectedNumero}
                    sx={{
                        width: 200
                    }}
                />
                <Button
                    variant="contained"
                    color="error"
                    disabled={!selectedNumero}
                    sx={{
                        width: 50,
                        height: 50
                    }}
                    onClick={subtractQuantiaInput}
                >
                    -
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    disabled={!selectedNumero}
                    sx={{
                        width: 50,
                        height: 50
                    }}
                    onClick={addQuiantiaInput}
                >+</Button>
            </Box>
        </>
    )
}