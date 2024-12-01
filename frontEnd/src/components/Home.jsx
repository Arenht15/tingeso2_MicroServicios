import React from 'react';
import {AppBar, Toolbar, Container, Typography, Button, Menu, MenuItem} from '@mui/material';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    return (
        <div className="full-height">
            <AppBar position="fixed" style={{zIndex: 2, backgroundColor: '#17cb17'}}>
                <Toolbar style={{width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div" sx={{textAlign: 'center'}}>
                        Presta Banco
                    </Typography>
                    <Button style={{color: 'inherit', backgroundColor: '#01b701'}} onClick={() => navigate('/Register')}
                    >Registrarse</Button>
                </Toolbar>
                <Toolbar style={{width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '70px', alignSelf: 'center', width: '100%' }}>
                        <Button
                            style={{ color: 'inherit', backgroundColor: '#0b8d0b', width: '450px', alignSelf: 'center' }}
                            onClick={(event) => setAnchorEl1(event.currentTarget)}
                        >
                            Cliente
                        </Button>
                        <Menu
                            anchorEl={anchorEl1}
                            open={Boolean(anchorEl1)}
                            onClose={() => setAnchorEl1(null)}
                            MenuListProps={{ style: { width: anchorEl1 ? anchorEl1.clientWidth : undefined,
                                    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' } }}>
                            <MenuItem onClick={() => {
                                setAnchorEl1(null);
                                navigate('/Simulation');
                            }}>Simular Credito</MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorEl1(null);
                                navigate('/InitialForm');
                            }}>Solicitar Credito</MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorEl1(null);
                                navigate('/StatusCredit');
                            }}>Consultar Estados Creditos</MenuItem>
                        </Menu>
                        <Button
                            style={{ color: 'inherit', backgroundColor: '#0b8d0b', width: '450px', alignSelf: 'center' }}
                            onClick={(event) => navigate("/ListCredit")}
                        >
                            Ejecutivo
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Container style={{textAlign: 'center', marginTop: '80px', zIndex: 1}}>
                <Typography variant="h2" gutterBottom style={{color: 'rgba(17,255,0,0.71)'}}>
                    Bienvenido a Presta Banco.
                </Typography>
                <Typography variant="h5" style={{color: '#555'}}>
                    El Banco Ideal Para Realizar Préstamos Más Confiable.
                </Typography>
            </Container>
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
    );
}

export default Home;