import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// fuente: Letra roboto, usada por material design de google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CssBaseline} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from './components/Temas/theme.js';

//paleta de colores
// primary- para elementos de interfaz primarios.
// secondary- para elementos de interfaz secundarios.
// error- para elementos que el usuario debe conocer.
// warning- para acciones potencialmente peligrosas o mensajes importantes.
// info- para resaltar información neutral.
// success- para indicar la finalización exitosa de una acción que desencadenó el usuario.


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
    {/* para usar los mismos estilos en todos los componentes */}
    <ThemeProvider theme={theme}>    
      <CssBaseline/>      
        <App />      
    </ThemeProvider>   
  </React.StrictMode>,
)
