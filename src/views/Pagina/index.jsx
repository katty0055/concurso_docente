import { Alert, AppBar, Slide, Snackbar, Tooltip, useMediaQuery, } from "@mui/material";
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useUserData } from "../../state/useState";
import Logo from '../../assets/fpuna.png'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import ConcursoCard from "../Concursos/ConcursosCard";
import { Outlet } from 'react-router-dom';



const Pagina = () => { 
  //estado para el mensaje de afirmacion
  const [alertMessage, setAlertMessage] = useState('Inicio de sesión exitoso');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const {userId,clearUserId } = useUserData();
  const drawerWidth = 240;
  const navigate= useNavigate();

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(matches? {}: {marginLeft: `-${drawerWidth}px`,}),
    ...(open && {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
       marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  
}));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutHandle= () => {
    clearUserId();
    console.log(`Codigo de usuario salido: ${userId}`)
    window.localStorage.removeItem('accessToken')
    navigate('/');
    
  };

  function Transition(props) {
    return <Slide {...props} direction="up" />;
  }
  
  const navLinks = [
    // {
    //   title: "Perfil",
    //   path: "perfil",
    //   icon: <AccountCircleIcon/>,
    //   onClick: ""
    // },
    {
      title: "Salir",
      path: "/",
      icon: <LogoutIcon/>,
      onClick: () => logoutHandle()
    },
  ];

  const menuLinks = [
    {
      title: "Inicio",
      path: "/concurso_docente/",
      icon: <HomeIcon/>,
 
    },     
  ];

  const tituloBarra = <img src={Logo} alt="Logo" style={{ width: 70, height: 'auto', display:'flex', flexShrink: 2 , }} />;
  
  return (
  <>
    <Box sx={{ display: 'flex', height:"100vh", boxSizing:"border-box", overflow: 'auto',  }}>
      <AppBar position="fixed" open={open} 
        sx={{
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)"}}
      >
        <Toolbar 
          sx={{
            justifyContent:  matches ? "flex-start" : (open ? "flex-end" : "space-between") ,
            alignItems:"center"
          }}
        >
          {!open && 
          <Tooltip title="Abrir Menu" arrow>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          }
          <Typography variant="h6" noWrap component="div"  
            sx={{ 
              display: open ? 'none' : 'flex', 
              flexShrink: 2,
              }}
          >
            {tituloBarra}
          </Typography>
          <Box>
            {!matches && navLinks.map(item => (
              <Tooltip title={item.title} arrow key={item.title} placement="bottom">
              <IconButton                
                color="inherit"
                onClick= {item.onClick}
                edge="end"
                sx={{ ml: 2, }}
              >
                {item.icon}     
              </IconButton>
              </Tooltip>
            ))}
          </Box>        
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,          
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color:theme.palette.primary.contrastText,
            background: theme.palette.primary.main , // Asegúrate de que el color coincida
            transition: 'background 0.2s ease', // Agrega una transición suave
            borderRight: 0,
          },         
        }}
        variant= {matches ? "temporary" : "persistent"}
        anchor="left"
        open={open}
      >
        <DrawerHeader> 
          <Tooltip title="Cerrar Menu" arrow>        
            <IconButton 
              onClick={handleDrawerClose}
              color="inherit"
              sx={{ mr: 2,  }}             
            >
            <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div">
            {tituloBarra}
          </Typography>
        </DrawerHeader>
        <List>
        {menuLinks.map((item) => (
            <ListItem key={item.title} disablePadding >
              <ListItemButton component={Link} to={item.path} >
                <ListItemIcon  sx={{ color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))} 
       {matches &&  // Utilizamos el operador lógico && para la condición
          navLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={item.onClick}>
                <ListItemIcon sx={{ color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))
        }
        </List>
      </Drawer>
      <Main open={open}>
      <Snackbar
        open={!!alertMessage } // Mostrar el Snackbar si hay un mensaje de error o éxito
        autoHideDuration={4000}
        onClose={() => setAlertMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Colocar el Snackbar arriba
        TransitionComponent={Transition}
        transitionDuration={{
          enter: 900,  // Duración de la transición al entrar en milisegundos
          exit: 300,   // Duración de la transición al salir en milisegundos
        }}
      > 
        <Alert variant="filled" severity= "success" >
          {alertMessage}    
        </Alert>
      </Snackbar> 
      <DrawerHeader />
      {location.pathname === '/concurso_docente/' ? (
              <ConcursoCard />
            ) : (
              <Outlet />
            )}
 
      </Main>
    </Box>     
  </>
  );
}

export default Pagina