import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Button, TextField, MenuItem, Box} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";

import creditServices from "../services/CreditServices.js";
import savingCapacityServices from "../services/SavingCapacityServices.js";

const EvaluationCredit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // Estados para los campos del formulario
    const [Ingress, setIngress] = React.useState(0.0);
    const [statusDicom, setStatusDicom] = React.useState('');
    const [Seniority, setSeniority] = React.useState(-1);
    const [IngressAcum, setIngressAcum] = React.useState(0.0);
    const [amountDebs, setAmountDebs] = React.useState(-1.0);
    const [MontoActual, setMontoActual] = useState(0.0);
    const [Antiguedad, setAntiguedad] = useState(-1);
    const [MontoAcumulado, setMontoAcumulado] = useState(0.0);
    const [MontoAhorro, setMontoAhorro] = useState(Array(12).fill(0.0));
    const [AbonoAhorro, setAbonoAhorro] = useState(Array(12).fill(0));
    const [RetiroAhorro, setRetiroAhorro] = useState(Array(12).fill(0));
    const [Year, setYear] = useState(0);
    const [idAux, setIdAux] = useState(0);
    const [TipoEmpleo, setTipoEmpleo] = useState('');
    // Estados para los archivos subidos
    const [payFile, setPayFile] = React.useState(null);
    const [dicomFile, setDicomfile] = React.useState(null);
    const [ingressFile, setIngressfile] = React.useState(null);
    const [debs, setDebs] = React.useState(null);
    const [AhorroFile, setAhorroFile] = React.useState(null);
    const [identityFile, setIdentityFile] = React.useState(null);

    const init = () => {
        creditServices.getCredit(id)
            .then((response) => {
                const credit = response.data;
                if (credit) {
                    setIngress(credit.ingress);
                    setStatusDicom(credit.statusDicom);
                    setSeniority(credit.seniority);
                    setIngressAcum(credit.ingressAcum);
                    setAmountDebs(credit.amountDebs);
                    setYear(credit.years);
                    setTipoEmpleo(credit.typeJob);
                    setIdAux(credit.id_savingCapacity);
                    handleFiles(credit);
                } else {
                    console.log("Datos de la solicitud no disponibles.");
                }
            })
            .catch((error) => {
                console.log("Se ha producido un error al intentar mostrar datos de la solicitud", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (idAux) {
            savingCapacityServices.getSavingCapacity(idAux)
                .then((response) => {
                    const sc = response.data;
                    setMontoActual(sc.scAmount);
                    setAntiguedad(sc.savingYears);
                    setMontoAcumulado(sc.savingAmountAcum);
                    setMontoAhorro((sc.savingHistory || Array(12).fill(0)).slice(0, 12));
                    setAbonoAhorro((sc.depositHistory || Array(12).fill(0)).slice(0, 12));
                    setRetiroAhorro((sc.withdrawalHistory || Array(12).fill(0)).slice(0, 12));
                })
                .catch((error) => {
                    console.log("Se ha producido un error al intentar mostrar datos de la capacidad de ahorro", error);
                });
        }
    }, [idAux]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", id);
        formData.append("Ingress", Ingress);
        formData.append("statusDicom", statusDicom);
        formData.append("seniority", Seniority);
        formData.append("ingressAcum", IngressAcum);
        formData.append("amountDebs", amountDebs);
        formData.append("years", Year);
        formData.append("typejob", TipoEmpleo);


        const formData2 = new FormData();
        formData2.append("id", idAux);
        formData2.append("scAmount", MontoActual);
        formData2.append("savingYears", Antiguedad);
        formData2.append("savingAmountAcum", MontoAcumulado);

        MontoAhorro.forEach((value) => {
            formData2.append("MontoAhorro", value); // Esto envía múltiples parámetros con el mismo nombre
        });
        AbonoAhorro.forEach((value) => {
            formData2.append("AbonoAhorro", value); // Esto envía múltiples parámetros con el mismo nombre
        });
        RetiroAhorro.forEach((value) => {
            formData2.append("RetiroAhorro", value); // Esto envía múltiples parámetros con el mismo nombre
        });


        savingCapacityServices.updateSavingCapacity(formData2)
            .then((response) => {
                creditServices.evaluationCredit(formData)
                    .then((response) => {
                        console.log("Capacidad de ahorro actualizada correctamente", response.data);
                        console.log("Crédito actualizado correctamente", response.data);
                        navigate('/ListCredit');
                    })
                    .catch((error) => {
                        console.log("Se ha producido un error al intentar actualizar la capacidad de ahorro o el crédito", error);
                        console.log("FormData2: ", formData);
                    }
                )
            })
            .catch((error) => {
                console.log("Se ha producido un error al intentar actualizar la capacidad de ahorro o el crédito", error);
                console.log("FormData2: ", formData2);
            });
    };

    const handleDocuemtation = () => {
        creditServices.updateStatus(id)
            .then((response) => {
                console.log("Estado de la solicitud actualizado correctamente", response.data);
                navigate('/ListCredit');
            })
            .catch((error) => {
                console.log("Se ha producido un error al intentar actualizar el estado de la solicitud", error);
            });
    }

    const handleFiles = (credit) => {
        const files = {
            ingressFile: credit.ingressFile,
            dicomFile: credit.histDicom,
            payFile: credit.payFile,
            debs: credit.debs,
            AhorroFile: credit.savingCapacityFile,
            identityFile: credit.identidadFile,
        };
        console.log("Identidad: ", credit.identidadFile);
        console.log("dicomFile: ", credit.histDicom);
        const fileBlobs = {};

        Object.keys(files).forEach(key => {
            if (files[key]) {
                const byteCharacters = atob(files[key]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                fileBlobs[key] = blob;
            }
        });

        setIngressfile(fileBlobs.ingressFile || null);
        setDicomfile(fileBlobs.dicomFile || null);
        setPayFile(fileBlobs.payFile || null);
        setDebs(fileBlobs.debs || null);
        setAhorroFile(fileBlobs.AhorroFile || null);
        setIdentityFile(fileBlobs.identityFile || null);
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
                    '1px solid black', padding: '20px', width: '900px', marginTop: '40px'}}>
                <Typography variant="h6" gutterBottom>
                    Datos Laborales
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '30px', marginLeft: '30px' }}>
                        Edad
                    </Typography>
                    <TextField
                        label="Edad"
                        value={Year > 0 ? Year : ""}
                        onChange={e => setYear(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 30"
                        required
                    />
                    <Box>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {identityFile ? identityFile.name : "No se ha seleccionado ningún archivo"}
                        </Typography>
                        {identityFile && (
                            <Button
                                variant="contained"
                                sx = {{backgroundColor: '#0b8d0b', color: 'white'}}
                                onClick={() => window.open(URL.createObjectURL(identityFile), '_blank')}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '10px' }}>
                        Ingresos Mensuales
                    </Typography>
                    <TextField
                        label="Ingresos Mensuales"
                        value={Ingress > 0 ? Ingress : ""}
                        onChange={e => setIngress(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 750000"
                        required
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {ingressFile ? ingressFile.name : "No se ha seleccionado ningún archivo"}
                        </Typography>
                        {ingressFile && (
                            <Button
                                variant="contained"
                                sx = {{backgroundColor: '#0b8d0b', color: 'white'}}
                                onClick={() => window.open(URL.createObjectURL(ingressFile), '_blank')}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '20px' }}>
                        Historial Crediticio
                    </Typography>

                    <TextField
                        select
                        label="Historial Crediticio"
                        value={statusDicom}
                        onChange={e => setStatusDicom(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    >
                        <MenuItem value={1}>Sin Deudas impagas</MenuItem>
                        <MenuItem value={0}>Con Deudas impagas</MenuItem>
                    </TextField>
                    <Box>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {dicomFile ? dicomFile.name : "No se ha seleccionado ningún archivo"}
                        </Typography>
                        {dicomFile && (
                            <Button
                                variant="contained"
                                sx = {{backgroundColor: '#0b8d0b', color: 'white'}}
                                onClick={() => window.open(URL.createObjectURL(dicomFile), '_blank')}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '8px', marginLeft: '10px' }}>
                        Antiguedad y estabilidad
                    </Typography>

                    <TextField
                        select
                        label="Tipo de Trabajador"
                        value={TipoEmpleo}
                        onChange={e => setTipoEmpleo(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    >
                        <MenuItem value={1}>Trabajador independiente</MenuItem>
                        <MenuItem value={0}>Trabajador Asalariado</MenuItem>
                    </TextField>

                    <TextField
                        label="Antiguedad En empleo Actual (Años)"
                        value={Seniority > 0 ? Seniority : ""}
                        onChange={e => setSeniority(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 3"
                        required
                    />
                    <TextField
                        label="Ingresos Acumulados en 1 año"
                        value={IngressAcum > 0 ? IngressAcum : ""}
                        onChange={e => setIngressAcum(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ej: 6000000"
                        required
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {payFile ? payFile.name : "No se ha seleccionado ningún archivo"}
                        </Typography>
                        {payFile && (
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#0b8d0b', color: 'white' }}
                                onClick={() => window.open(URL.createObjectURL(payFile), '_blank')}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </Box>

                    <Box/>
                </Box>
                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '30px', alignItems: "center" , marginLeft: "20px"}}>
                        Deudas
                    </Typography>

                    <TextField
                        label="Deuda Total"
                        value={amountDebs >= 0 ? amountDebs : ""}
                        onChange={e => setAmountDebs(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {debs ? debs.name : "No se ha seleccionado ningún archivo"}
                        </Typography>
                        {debs && (
                            <Button
                                variant="contained"
                                sx = {{backgroundColor: '#0b8d0b', color: 'white'}}
                                onClick={() => window.open(URL.createObjectURL(debs), '_blank')}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box style={{backgroundColor: 'white', color: 'black', border:
                    '1px solid black', padding: '20px', width: '900px', marginTop: '40px'}}>
                <Typography variant="h6" component="div" sx={{textAlign: 'center'}}>
                    Cuenta de ahorro
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '10px' }}>
                        Datos de la cuenta
                    </Typography>
                    <TextField
                        label="Monto Actual"
                        value={MontoActual >= 0 ? MontoActual : "" || ""}
                        onChange={e => setMontoActual(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Años de antiguedad de la cuenta"
                        value={Antiguedad >= 0 ? Antiguedad : ""}
                        onChange={e => setAntiguedad(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Monto Acumulado de la cuenta"
                        value={MontoAcumulado >= 0 ? MontoAcumulado : "" || ""}
                        onChange={e => setMontoAcumulado(e.target.value.replace(/[^0-9]/g, ''))}
                        variant="outlined"
                        margin="dense"
                        required
                    />
                    <Box>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {AhorroFile ? AhorroFile.name : "No se ha seleccionado ningún archivo"}
                        </Typography>
                        {AhorroFile && (
                            <Button
                                variant="contained"
                                sx = {{backgroundColor: '#0b8d0b', color: 'white'}}
                                onClick={() => window.open(URL.createObjectURL(AhorroFile), '_blank')}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </Box>

                </Box>
                <Box sx={{ textAlign: 'center', marginTop: "20px"}}>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '30px', alignItems: "center"}}>
                        Monto de los últimos 12 meses
                    </Typography>

                    <Box sx={{ display: 'flex', gap: '2px', flexWrap: 'wrap', alignItems: "center" }}>
                        {Array(12).fill('').map((_, index) => (
                            <TextField
                                key={index}
                                label={`Monto ${index + 1}`}
                                value={MontoAhorro[index] !== undefined ? MontoAhorro[index] : ""}
                                onChange={e => {
                                    const newMontoAhorro = [...MontoAhorro];
                                    newMontoAhorro[index] = e.target.value.replace(/[^0-9]/g, '');
                                    setMontoAhorro(newMontoAhorro);
                                }}
                                variant="outlined"
                                margin="dense"
                                required
                            />
                        ))}
                    </Box>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '30px', alignItems: "center"}}>
                        Retiros de los últimos 12 meses
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '2px', flexWrap: 'wrap', alignItems: "center" }}>
                        {Array(12).fill('').map((_, index) => (
                            <TextField
                                key={index}
                                label={`Monto ${index + 1}`}
                                value={RetiroAhorro[index] >= 0 ? RetiroAhorro[index] : ""}
                                onChange={e => {
                                    const newRetiroAhorro = [...RetiroAhorro];
                                    newRetiroAhorro[index] = e.target.value.replace(/[^0-9]/g, '');
                                    setRetiroAhorro(newRetiroAhorro);
                                }}
                                variant="outlined"
                                margin="dense"
                                required
                            />
                        ))}
                    </Box>
                    <Typography variant="h8" gutterBottom sx={{ marginRight: '30px', alignItems: "center"}}>
                        Abonos de los últimos 12 meses
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '2px', flexWrap: 'wrap', alignItems: "center" }}>
                        {Array(12).fill('').map((_, index) => (
                            <TextField
                                key={index}
                                label={`Monto ${index + 1}`}
                                value={AbonoAhorro[index] >= 0 ? AbonoAhorro[index] : ""}
                                onChange={e => {
                                    const newAbonoAhorro = [...AbonoAhorro];
                                    newAbonoAhorro[index] = e.target.value.replace(/[^0-9]/g, '');
                                    setAbonoAhorro(newAbonoAhorro);
                                }}
                                variant="outlined"
                                margin="dense"
                                required
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1, margin: '0 10px' }}
                    onClick={(event) => navigate("/ListCredit")}
                >
                    volver
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1, margin: '0 10px' }}
                    onClick={handleSubmit}
                >
                    Evaluar Crédito
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0b8d0b', color: 'white', flex: 1, margin: '0 10px' }}
                    onClick={handleDocuemtation}
                >
                    Documentacion Pendientes
                </Button>
            </Box>
            <style>{`
             .full-height {
               min-height: 100vh;
               display: flex;
               flex-direction: column;
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

export default EvaluationCredit;