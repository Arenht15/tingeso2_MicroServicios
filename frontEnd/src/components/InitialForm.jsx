import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, TextField, MenuItem, Box} from '@mui/material';
import {useNavigate} from "react-router-dom";
import userServices from "../services/UserService.js";
import solicitudServices from "../services/SolicitudServices.js";
import creditServices from "../services/CreditServices.js";

const InitialForm = () => {
    const navigate = useNavigate();
    const [rut, setRut] = useState("");
    const [ErrorRut, setErrorRut] = useState(false);
    const [type, setType] = useState(1);
    const [amount, setAmount] = useState(0.0);
    const [term, setYears] = useState(0);
    const [rate, setRate] = useState(0.0);
    const [porcentaje, setPorcentaje] = useState(0.0);
    const [simulatedAmount, setSimulatedAmount] = useState(0.0);
    const [showSimulatedAmount, setShowSimulatedAmount] = useState(false);

    const existeRut = async (rut) => {
        try {
            const response = await userServices.validUser(rut);
            setErrorRut(response.data);
            return response.data;
        } catch (e) {
            console.log("No se pudo obtener el rut.", e);
            return false;
        }
    }

    const getSimulatedAmount = async (type, amount, term, rate) => {
        const isValidRut = await existeRut(rut);
        if (Object.keys(isValidRut).length === 0) {
            alert("Debe Registrarse para poder Solicitar un credito");
            return;
        }
        creditServices.simulateCredit(type, amount, term, rate)
            .then(response => {
                console.log("Monto simulado: ", response.data);
                setSimulatedAmount(response.data);
                if (response.data === 0.0) {
                    setShowSimulatedAmount(true);
                    return;
                }
                console.log("ID del cliente: ", isValidRut.id);
                console.log(isValidRut);
                const formData = new FormData();
                formData.append("id_user", isValidRut.id);
                formData.append("rut", isValidRut.rut);
                formData.append("type", type);
                formData.append("amount", amount);
                formData.append("term", term);
                formData.append("rate", rate);
                formData.append("cuota", response.data);
                formData.append("birthdate", isValidRut.birthdate);
                formData.append("Porcentaje", porcentaje);
                solicitudServices.createCredit(formData)
                    .then((response) => {
                        console.log("Credito creado: ", response.data.id);
                        navigate(`/Form/${response.data.id}`);
                    })
                    .catch((e) => {
                        console.log("data: ", response.data)
                        console.log("No se pudo crear el credito.", e);
                    })
            })
            .catch(e => {
                console.log("Error al simular el crédito: ", e);
            });
    }

    return(
        <div className="full-height">
            <AppBar position="fixed" style={{zIndex: 2, backgroundColor: '#17cb17'}}>
                <Toolbar style={{width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div" sx={{textAlign: 'center'}}>
                        Presta Banco
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box style={{backgroundColor: 'white', color: 'black', border:
                    '1px solid black', padding: '20px', width: '700px', marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Datos del credito
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        label="Rut"
                        value={rut || ""}
                        onChange={e => setRut(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 12345678-9"
                        required
                    />
                    <TextField
                        select
                        label="Tipo de Crédito"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    >
                        <MenuItem value={1}>Primera Vivienda</MenuItem>
                        <MenuItem value={2}>Segunda Vivienda</MenuItem>
                        <MenuItem value={3}>Propiedades Comerciales</MenuItem>
                        <MenuItem value={4}>Remodelación</MenuItem>
                    </TextField>
                </Box>

                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        label="Tasa De Interes"
                        value={rate || ""}
                        onChange={e => setRate(e.target.value.replace(/[^0-9.]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 3.9"
                        required
                    />
                    <TextField
                        label="Plazo Maximo De Pago (En Años)"
                        value={term || ""}
                        onChange={e => setYears(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 12"
                        required
                    />
                </Box >
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        label="Monto"
                        value={amount || ""}
                        onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 1000000"
                        required
                    />
                    <TextField
                        label = "Porcentaje de Financiamiento"
                        value = {porcentaje || ""}
                        onChange = {e => setPorcentaje(e.target.value.replace(/[^0-9]/g, ''))}
                        variant = "outlined"
                        fullWidth
                        margin = "normal"
                        placeholder = "Ej: 80"
                    />
                </Box>


                {showSimulatedAmount && simulatedAmount === 0.0 && (
                    <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '10px', color: 'red' }}>
                        Error: Algún parámetro de la simulación es incorrecto.
                    </Typography>
                )}
                <Box sx={{ display: 'flex', gap: '10px'}}>
                    <Button
                        style={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1 }}
                        onClick={() => navigate('/')}
                    >
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary"
                            style={{ backgroundColor: '#01B701', flex: 1 }}
                            onClick={(e) => getSimulatedAmount(type, amount, term, rate)}>
                        Siguiente
                    </Button>
                </Box>

            </Box>


            <style>{`
              .full-height {
                min-height: 100vh;
                display: flex;
                flex-direction: column; /* Cambiar a columna para que el AppBar esté arriba */
                align-items: center;
                justify-content: center;
                position: relative;
              }

              body {
                  margin: 0;
                  background-image: radial-gradient(circle, rgba(173, 255, 47, 0.3) 10%, rgba(255, 255, 255, 0) 15%);
                  background-size: 20px 20px;
                  background-color: white;
              }
            `}</style>

        </div>
    )
}
export default InitialForm