import { Alert, AppBar, Snackbar, Tooltip, useMediaQuery, } from "@mui/material";
import { useEffect, useState } from "react";
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
import { useLocation } from 'react-router-dom';

// Componente principal que contendra la barra de navegacion, el cajon desplegable
// y el contenido que sera dinamico (de acuerdo a la url va a cambiar)
const Pagina = () => { 

  //constantes
  const alertMessage = 'Inicio de sesión exitoso';
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const {clearUserId } = useUserData();
  const drawerWidth = 240;
  const navigate= useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);

  //constante que contiene al logo que se muestra en la barra de navegacion
  const tituloBarra = <img src={Logo} alt="Logo" style={{ width: 70, height: 'auto', display:'flex', flexShrink: 2 , }} />;

  // Se utiliza para actualizar isLoaded,  variable de estado según 
  // el nombre de la ruta URL actual. Esto es útil para determinar 
  // cuándo el componente ha terminado de cargarse y renderizarse,
  // y se puede utilizar para mostrar u ocultar condicionalmente 
  // indicadores de carga u otros elementos de la interfaz de usuario.
  useEffect(() => {
    setIsLoaded(true);
  }, [location.pathname]); 

  //si isLoaded no esta en true debera mostrar en pantalla
  //lo que el return indique
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  //Encabezado del cajon lateral
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',    
  }));

  //despliega el cajon lateral
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  //oculta el cajon lateral
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //para desloguearse
  const logoutHandle= () => {
    clearUserId();
    window.localStorage.removeItem('accessToken')
    navigate('/');    
  };

  //Iconos de la barra de navegacion 
  const navLinks = [
    {
      title: "Salir",
      path: "/",
      icon: <LogoutIcon/>,
      onClick: () => logoutHandle()
    },
  ];

  // iconos del cajon
  const menuLinks = [
    {
      title: "Inicio",
      path: "/concurso_docente/",
      icon: <HomeIcon/>, 
    },     
  ]; 


  return (
  <>
    <Box 
      sx={{ 
        display: 'flex', 
        height:"100vh", 
        boxSizing:"border-box", 
        overflow: 'auto',
      }}
    >
      <AppBar position="fixed" open={open} 
        sx={{
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)"
        }}
      >
        <Toolbar 
          sx={{
            justifyContent:  matches ? "flex-start" : (open ? "flex-end" : "space-between"),
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
            width:  matches ? "80%" : drawerWidth,
            boxSizing: 'border-box',
            color:theme.palette.primary.contrastText,
            background: theme.palette.primary.main ,
            transition: 'background 0.2s ease', 
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
          {matches &&  navLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={item.onClick}>
                <ListItemIcon sx={{ color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component={"div"}
        style={{
          flexGrow: 1,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen}),
          marginLeft: !matches ? `-${drawerWidth}px` : 0,           
          ...(open && {transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,}),
          marginLeft: 0}),
        }}
      >
        <DrawerHeader />
        {location.pathname === '/concurso_docente/' ? (
          <>
            <Snackbar
              open={openAlert } 
              autoHideDuration={2000}
              onClose={() => setOpenAlert(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            > 
              <Alert variant="filled" severity= "success" >
                {alertMessage}    
              </Alert>
            </Snackbar>
            <ConcursoCard />
          </>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>     
  </>
  );
}

export default Pagina