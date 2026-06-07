import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Autocomplete
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import useClientesHttp from "@/hooks/http/useClientesHttp";

export default function Cliente(props) {
  const { clientId, setClientId } = props;

  const { clientes, cargando, error, crearCliente } = useClientesHttp();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form states for creating a new client
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("0");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const selectedClient = clientes.find((c) => String(c.id) === String(clientId));

  const handleCreateClient = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!name || !email || !phone) {
      setSubmitError("Todos los campos obligatorios (*) deben ser completados.");
      return;
    }

    try {
      const payload = {
        name,
        email,
        phone,
        balance: parseFloat(balance) || 0
      };

      // Call the hook to register the client
      await crearCliente(payload);

      setSubmitSuccess("¡Cliente registrado con éxito!");

      // Clear form inputs
      setName("");
      setEmail("");
      setPhone("");
      setBalance("0");
      setShowCreateForm(false);
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || "Error al registrar cliente.");
    }
  };

  // Automatically select the newly created client
  useEffect(() => {
    if (submitSuccess && clientes.length > 0) {
      // Find the client with matching name (or latest added client)
      const latestClient = [...clientes].sort((a, b) => b.id - a.id)[0];
      if (latestClient) {
        setClientId(latestClient.id);
      }
    }
  }, [clientes, submitSuccess, setClientId]);

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", py: 2 }}>
      <Typography variant="h5" fontWeight="700" color="text.primary" sx={{ mb: 1, textAlign: "center" }}>
        Selección del Cliente
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
        Elija al cliente que realiza la apuesta o registre uno nuevo al instante.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {cargando && clientes.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress size={30} sx={{ mr: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Cargando clientes de la base de datos...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Dropdown Autocomplete Column */}
          <Grid item xs={12} width={200}>
            <Autocomplete
              options={clientes}
              getOptionLabel={(option) => `${option.name} (${option.email || ''})`}
              value={selectedClient || null}
              onChange={(event, newValue) => {
                setClientId(newValue ? newValue.id : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccionar Cliente *"
                  variant="outlined"
                  required
                />
              )}
              noOptionsText="No se encontraron clientes"
              loading={cargando}
              loadingText="Cargando..."
              fullWidth
            />
          </Grid>

          {/* Selected Client Card Details */}
          {selectedClient && (
            <Grid item xs={12}>
              <Card sx={{ borderLeft: "5px solid #2e7d32", bgcolor: "#f8fdf9", borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                    <PersonIcon color="success" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {selectedClient.name}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={1}>
                      <EmailIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        <strong>Email:</strong> {selectedClient.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={1}>
                      <PhoneIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        <strong>Teléfono:</strong> {selectedClient.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" alignItems="center" gap={1}>
                      <AccountBalanceWalletIcon color="success" fontSize="small" />
                      <Typography variant="body2" color="success.main" fontWeight="600">
                        Saldo Disponible: R$ {parseFloat(selectedClient.balance || 0).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Toggle form button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Button
              variant="text"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={() => {
                setShowCreateForm(!showCreateForm);
                setSubmitError("");
                setSubmitSuccess("");
              }}
              sx={{ fontWeight: "600" }}
            >
              {showCreateForm ? "Cancelar registro de cliente" : "¿Cliente nuevo? Registrar al vuelo"}
            </Button>
          </Grid>

          {/* Embedded Creation Form */}
          {showCreateForm && (
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 3, p: 1, borderColor: "primary.light" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 2 }}>
                    Registrar Nuevo Cliente
                  </Typography>

                  {submitError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {submitError}
                    </Alert>
                  )}
                  {submitSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {submitSuccess}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleCreateClient}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Nombre Completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          type="email"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Teléfono"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Saldo Inicial (R$)"
                          value={balance}
                          onChange={(e) => setBalance(e.target.value)}
                          inputProps={{ step: "0.01", min: "0" }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                        <Button type="submit" variant="contained" color="success">
                          Guardar y Seleccionar
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}
