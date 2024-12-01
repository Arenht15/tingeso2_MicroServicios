import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box, Table} from '@mui/material';
import creditServices from "../services/CreditServices.js";



const ListCredit = () => {
    const navigate = useNavigate();
    const [credits, setCredits] = useState([]);

    const init = () => {
        creditServices.getAll()
            .then((response) => {
                console.log("Mostrando listado de Solicitudes.", response.data);
                setCredits(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar listado de Creditos",
                    error
                );
            });
    };

    useEffect(() => {
        init();
    }, []);


    return (
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
                <Typography variant="h6" gutterBottom>  Listado de Solicitudes de Crédito </Typography>

                <Table>
                    <thead>
                        <tr>
                            <th> Rut </th>
                            <th> Monto Solicitado </th>
                            <th> Estado </th>
                            <th> Acción </th>
                        </tr>
                    </thead>
                    <tbody>
                    {credits.map((credit) => (
                        <React.Fragment key={credit.id}>
                            <tr>
                                <td> {credit.rut} </td>
                                <td> ${credit.amount.toLocaleString('de-DE')} </td>
                                <td> {credit.aprovedApplication === -1 ? "En Proceso" :
                                    credit.aprovedApplication === 2 ? "Documentacion Pendiente" :
                                        credit.aprovedApplication} </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1 }}
                                        onClick={() => navigate(`/EvaluationCredit/${credit.id}`)}
                                    >
                                        Acción
                                    </Button>
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
                style={{ backgroundColor: '#0b8d0b', color: 'white', marginTop: '20px' }}
                onClick={() => navigate("/")}
            >Volver</Button>

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
        );
    }

export default ListCredit