import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box, Table, TextField} from '@mui/material';
import creditServices from "../services/CreditServices.js";
import userService from "../services/UserService.js";

const StatusCredit = () => {
    const navigate = useNavigate();
    const [credits, setCredits] = useState([]);
    const [rut, setRut] = useState("");
    const [showCosts, setShowCosts] = useState(null);
    const handleSearch = () => {
        if (!rut) {
            alert("Por favor, ingrese un RUT.");
            return;
        }

        userService.validUser(rut)
            .then((response) => {
                if (response.data.length === 0) {
                    alert("Usuario no encontrado");
                } else {
                    console.log("Usuario encontrado", response.data);
                    creditServices.searchCreditbyIdUser(response.data.id)
                        .then((response) => {
                            console.log("Mostrando listado de Solicitudes.", response.data);
                            setCredits(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return(
        <div>
            <AppBar position="fixed" style={{zIndex: 2, backgroundColor: '#17cb17'}}>
                <Toolbar style={{width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div" sx={{textAlign: 'center'}}>
                        Presta Banco
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box style={{backgroundColor: 'white', color: 'black', border:
                    '1px solid black', padding: '20px', width: '700px', marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>  Listado de Crédito </Typography>
                <Box>
                    <TextField
                        label="Ingrese su rut"
                        size="small"
                        variant="outlined"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1, margin: '0 10px' }}
                        onClick={handleSearch} // Cambiado para manejar la búsqueda
                    >
                        Buscar
                    </Button>
                </Box>

                <Table>
                    <thead>
                    <tr>
                        <th> Rut </th>
                        <th> Monto Solicitado </th>
                        <th> Estado </th>
                        <th> Costos </th>
                    </tr>
                    </thead>
                    <tbody>
                    {credits.map((credit) => (
                        <React.Fragment key={credit.id}>
                            <tr>
                                <td> {credit.rut} </td>
                                <td> ${credit.amount.toLocaleString('de-DE')} </td>
                                <td> {credit.aprovedApplication === -1 ? "En Proceso" :
                                    credit.aprovedApplication === 2 ? "Documentacion pendiente" :
                                        credit.aprovedApplication === 1 ? "Aceptado": "Rechazado"} </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1 }}
                                        onClick={() => setShowCosts(credit.id)}
                                        disabled={credit.aprovedApplication !== 1}
                                    >
                                        {credit.aprovedApplication === 1 ? "Ver Costos" : "No disponible"}
                                    </Button>
                                </td>
                            </tr>
                            {showCosts === credit.id && (
                                <tr>
                                    <td colSpan="4">
                                        <Box style={{ padding: '10px', backgroundColor: '#f0f0f0',
                                            display: 'flex', justifyContent: 'space-around' }}>
                                            <Typography variant="body1">Seguro de desgravamen: ${Math.floor(credit.creditLifeInsurance).toLocaleString('de-DE')}</Typography>
                                            <Typography variant="body1">Seguro de incendio: $20.000</Typography>
                                            <Typography variant="body1">Comision: ${Math.floor(credit.creditJob).toLocaleString('de-DE')}</Typography>
                                            <Typography variant="body1">Costo Mensual: ${Math.floor(credit.costM).toLocaleString('de-DE')}</Typography>
                                            <Typography variant="body1">Costo Total: ${Math.floor(credit.costT).toLocaleString('de-DE')}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="4">
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <hr />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </Table>
            </Box>
            <Button
                variant="contained"
                sx={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1, margin: '0 10px', marginTop: '10px' }}
                onClick={() => navigate("/")}
            >
                Volver
            </Button>

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
                      overflow: hidden;
                  }
                `}</style>
    </div>
)

}

export default StatusCredit;