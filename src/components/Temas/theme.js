//definicion del tema de la aplicacion
import {createTheme} from '@mui/material';
import { indigo, pink, red, orange, lightBlue, green} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: indigo[500],
      light: '#6573C3',
      dark: '#2C387E',
      contrastText:'#FFFFFF',

    }, 
    secondary: {
      main: pink['A400'],
      light: '#F73378',
      dark: '#AB003C',
      contrastText:'#FFFFFF',
    },
    error: {
      main: red[700],
      light: red[400],
      dark: red[800],
      contrastText:'#FFFFFF',
    },
    warning: {
      main: '#ed6c02',
      light: orange[500],
      dark: orange[900],
      contrastText:'#FFFFFF',
    },
    info: {
      main: lightBlue[700],
      light: lightBlue[500],
      dark: lightBlue[900],
      contrastText:'#FFFFFF',
    },
    success: {
      main: green[800],
      light: green[500],
      dark: green[900],
      contrastText:'#FFFFFF',
    },
  },
  typography: { 
    h1: {
        '@media (min-width:0px)': {
          fontSize: '1.35rem',
        },
        '@media (min-width:300px)': {
          fontSize: '1.4rem',
        },
        '@media (min-width:600px)': {
          fontSize: '1.45rem',
        },
        '@media (min-width:900px)': {
          fontSize: '1.5rem',
        },
        '@media (min-width:1200px)': {
          fontSize: '1.55rem',
        },
    },
    h2: {
      '@media (min-width:0px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1.3rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.35rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.4rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.45rem',
      },
    },
    h3: {
      '@media (min-width:0px)': {
        fontSize: '1.15rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1.2rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.3rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.35rem',
      },
    },
    h4: {
      '@media (min-width:0px)': {
        fontSize: '1.05rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1.1rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.15rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.2rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      '@media (min-width:0px)': {
        fontSize: '0.95rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.05rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.1rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.15rem',
      },
    },
    h6: {
      '@media (min-width:0px)': {
        fontSize: '0.85rem',
      },
      '@media (min-width:300px)': {
        fontSize: '0.9rem',
      },
      '@media (min-width:600px)': {
        fontSize: '0.95rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.05rem',
      },
    },
    body1: { 
      '@media (min-width:0px)': {
        fontSize: '0.75rem',
      },
      '@media (min-width:300px)': {
        fontSize: '0.8rem',
      },
      '@media (min-width:600px)': {
        fontSize: '0.85rem',
      },
      '@media (min-width:900px)': {
        fontSize: '0.9rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '0.95rem',
      },
    },
    body2: { 
      '@media (min-width:0px)': {
        fontSize: '0.65rem',
      },
      '@media (min-width:300px)': {
        fontSize: '0.7rem',
      },
      '@media (min-width:600px)': {
        fontSize: '0.75rem',
      },
      '@media (min-width:900px)': {
        fontSize: '0.85rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '0.9rem',
      },
    },
    subtitle1: { 
      '@media (min-width:0px)': {
        fontSize: '0.55rem',
      },
      '@media (min-width:300px)': {
        fontSize: '0.6rem',
      },
      '@media (min-width:600px)': {
        fontSize: '0.65rem',
      },
      '@media (min-width:900px)': {
        fontSize: '0.7rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '0.75rem',
      },
    },
    subtitle2: { 
      '@media (min-width:0px)': {
        fontSize: '0.45rem',
      },
      '@media (min-width:300px)': {
        fontSize: '0.5rem',
      },
      '@media (min-width:600px)': {
        fontSize: '0.55rem',
      },
      '@media (min-width:900px)': {
        fontSize: '0.6rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '0.65rem',
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      xm: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },  
})

export default theme;