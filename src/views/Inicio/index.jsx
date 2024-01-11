import Button  from "@mui/material/Button";
import {Grid, Typography, Box, TextField, InputAdornment, Snackbar, Alert, AlertTitle } from "@mui/material";
import Logo from './../../assets/Logocorporativo.jpeg'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import {useServerStore, useUserData} from '../../state/useState';

// Componente de Login
const Login = () => {
  //variable global que almacena el id de usuario 
  const { setUserId} = useUserData();
  //variable global que almacena el nombre del servidor
  const {localhost} = useServerStore();
  //para navegar a otras paginas
  const navigate= useNavigate();
  //datos del usuario
  const [documento, setDocumento] = useState('')
  const [password, setPassword] = useState('')
  //estado para el mensaje de error 
  const [alertMessage, setAlertMessage] = useState('');


 
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        const decodedToken = jwtDecode(parsedToken).user_id;
        setUserId(decodedToken);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        // Manejar el error, limpiando el token del localStorage
        window.localStorage.removeItem('accessToken');
      }
    }
  }, [setUserId]);
  
  const onLoginHandler = (userId) => {
    setUserId(userId)
    //se dirige a pagina principal
    navigate('concurso_docente/');
   
  };

  const registroHandle = () => {
    //Funcion para restablecer contrasenha
  };
  
  const loginHandle =async (e) => {
    e.preventDefault()
    // Limpiar errores al intentar iniciar sesión nuevamente
    try {
      const response = await fetch(`http://${localhost}:8000/concurso/auth/jwt/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        documento,
      }),      
    })
    if (!response.ok) {
      throw new Error( 'Credenciales incorrectas');
    }
    const tokenData = await response.json();
    window.localStorage.setItem('accessToken', JSON.stringify(tokenData.access));
    onLoginHandler(jwtDecode(tokenData.access).user_id);
  } catch (error) {
    // Almacenar el mensaje de error 
    setAlertMessage('Credenciales incorrectas');
  }
};

  
  const Img =styled("img")({
    display: "flex",
    minHeight:26,
    '@media (min-width:0px)': {
      height: "5vh" ,
    },
    '@media (min-width:600px)': {
      height: "8.9vh" ,
    },
    '@media (min-width:900px)': {
      height: "11vh",
    },
    '@media (min-width:1200px)': {
      height: "11.7vh",
    },
  });

  return (
    <>
     <Grid item container fixed="true"
     xs={10} sm={9} md={8} lg={7}
     justifyContent='center'
     alignItems="center"
     height="100vh"
     sx={{
        mx: "auto",
        position: "relative",
     }}
     >
        <Snackbar
          open={!!alertMessage } // Mostrar el Snackbar si hay un mensaje de error o éxito
          autoHideDuration={4000}
          onClose={() => setAlertMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Colocar el Snackbar arriba
        >
          <Alert variant="filled" severity= "error">
            <AlertTitle>{alertMessage}</AlertTitle>
              
          </Alert>
        </Snackbar> 
       <Grid item 
          xs={12} sm={11} md={10} lg={9} 
          height={"86%"}
          justifyContent="space-around"
          alignItems="center"
          sx={{
            backgroundColor: 'primary.contrastText',
            borderRadius: 2,
            borderStyle: "double",
            boxShadow: 4,
            borderColor: "primary.dark",
            pt:1,
            pb:2,
            display: "flex",
            flexDirection: "column",
            gap:0.5,
            boxSizing:"border-box",
            }}
        >
          <Grid item container
            xs={12} sm={11} md={10} lg={9} 
            height={"18%"} 
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: 'primary.contrastText',
              display:"flex",
              p:0.6,
            }}
          >
            <Img src={Logo} alt="Logo" /> 
          </Grid>
           <Grid item container
              xs={12} sm={11} md={10} lg={9} 
              maxHeight={"14%"} 
              justifyContent="center"
              alignItems="center"                  
              sx={{
                borderColor: "secondary.main",
              }}    
            >  
             <Typography
                variant="h3"
                textAlign= "center"
                color="primary.main"
                fontWeight= "medium"
              > 
                Iniciar Sesión
              </Typography>                            
            </Grid> 
              <Box  
                component="form"
                onSubmit={loginHandle}
                autoComplete="off"        
                sx={{
                  height:"60%",
                  mx:2,
                  display: "flex",  
                  flexDirection:"column",     
                  gap: 0.5,   
                  width:"80%",                              
                }}
              >
                <TextField
                  id="usuario"
                  label="usuario"
                  type="text"
                  variant="outlined"
                  size={window.innerWidth >= 900 ? "medium" : "small"}
                  required 
                  onChange={(e) => {
                    setDocumento(e.target.value)
                  }}                          
                  value={documento}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon fontSize="small"/>
                      </InputAdornment>
                    ),
                  }}                
                /> 
                <TextField
                  id="contraseña"
                  label="contraseña"
                  type="password"
                  variant="outlined"
                  size={window.innerWidth >= 900 ? "medium" : "small"}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}  
                  value={password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" >
                        <KeyIcon fontSize="small"/>
                      </InputAdornment>
                    ),
                  }}                
                />   
                  <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"                 
                  >
                  <Typography
                    variant="h6"
                    textAlign= "center"
                  >
                    Confirmar
                  </Typography>
              </Button> 
              </Box>
                <Grid item 
                  xs={12} sm={11} md={10} lg={9} 
                  maxHeight={"16%"} 
                  justifyContent={"center"}
                  sx={{
                    borderColor: "secondary.main",
                    display:"flex",
                    flexDirection:"column",
                  }}    
                > 
                  <Typography
                    variant="body2"
                    textAlign= "center"
                    fontWeight= "regular"
                  >
                    Registrarse
                  </Typography> 
                  <Typography
                    variant="body2"
                    textAlign= "center"
                    fontWeight= "regular"
                    onClick={registroHandle}
                    >
                    Restablecer contraseña
                  </Typography> 
                </Grid>  
            </Grid>
     </Grid>
    
            
    </>
  )
}

export default Login;


