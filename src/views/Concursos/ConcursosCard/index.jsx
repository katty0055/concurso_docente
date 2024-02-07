import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, 
  CardActionArea, CardActions, CardContent, CardMedia, Checkbox, Chip, 
  FormControlLabel, FormGroup, Grid, InputBase, Link, Paper, Tooltip, 
  Typography } from "@mui/material"
import foto from "./../../../assets/nuevo_concurso.png"
import { useConcursoData, useServerStore } from "../../../state/useState";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//Componente que contiene los concursos y un filtro para los mismos
const ConcursoCard = () =>{
  //declaracion de constantes
  const {localhost} = useServerStore();
  const apiUrl = `http://${localhost}:8000/concurso/concurso/`;
  const apiUrlTiposConcurso = `http://${localhost}:8000/concurso/tipoconcurso/`;
  const [data, setData] = useState(null);
  const [tiposConcurso, setTiposConcurso] = useState(null);
  const concursoDataStore = useConcursoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [concursos, setConcursos] = useState(null); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] =useState('');
  const estados = ["Todos", "Abierto", "Cerrado", "Redaccion"];
  const [checkedStates, setCheckedStates] = useState(new Array(estados.length).fill(true));
  const [checkedTypes, setCheckedTypes] = useState(Array(estados.length).fill(true));

//  Trae los datos de concurso y los almacena en la variable
//  concursos, se ejecuta cada vez que la variable apiUrl cambia de valor
  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',  
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
        return response.json();
      })
    .then(data => {
      setData(data);
      setConcursos(data)
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });       
  },[apiUrl]); 

  //redirije a postulacion
  const handlePostularClick = (concurso) => {
    concursoDataStore.setConcursoData(concurso);
    console.log("postular")
    //navigate(`postulacion`);
  };

  //Trae los datos de los tipos de concurso y los almacena en la variable
  //tipoConcurso, se ejecuta cada vez que la variable apiUrlTiposConcurso
  //cambia de valor
  useEffect(() => {
    fetch(apiUrlTiposConcurso, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
        return response.json();
    })
    .then(data => {
      setTiposConcurso(data);
    })
    .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
  },[apiUrlTiposConcurso]); 
    
  //si todavia no estan definidos los tipos de concursos
  //aparecera el mensaje cargando en el lugar donde deberia de
  //decir que tipo de concurso es el que aparece en el card 
  const getDescriptionById = (id) => {
    if (!tiposConcurso) {
      return 'Cargando...'; 
    }
      const tipoConcurso = tiposConcurso.find(tipo => tipo.tipo_concurso_id === id);
      return tipoConcurso ? tipoConcurso.descripcion_tipo_concurso : 'N/E';
  };

  //muestra los colores de los estados
  const mostrarEstado = (estado) => {
    switch (estado) {
      case 'CERRADO':
        return 'error.main'; 
      case 'REDACCION':
        return 'warning.main'; 
      case 'ABIERTO':
        return 'success.main'; 
      default:
        return 'info.main'; 
    } 
  };

  //muestra el mensaje que debe mostrar el card de acuerdo al estado
  const mostrarMensaje= (estado) => {
    switch (estado) {
      case 'CERRADO':
        return 'Cerrado'; 
      case 'REDACCION':
        return 'Redaccion'; 
      case 'ABIERTO':
        return 'Abierto'; 
      default:
        return 'Sin estado'; 
    }       
  };
           
  //funcion para realizar el filtrado de los concursos
  //primero verifica que las fechas
  //luego hace la busqueda por denominacion y por fecha
  //luego hace el filtro de acuerdo a los estados y a los
  //tipos de concursos
  const handleSearchClick = () => {
    if (data) {
      validateDates()
      const startDateObj = startDate ? dayjs(startDate).subtract(1, 'day') : null;
      const endDateObj = endDate ? dayjs(endDate).add(1, 'day') : null;
      let filteredResult = data.filter((concurso) =>
        concurso.denominacion_conc.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (startDateObj ? dayjs(concurso.vigencia_desde).isAfter(startDateObj) : true) &&
        (endDateObj ? dayjs(concurso.vigencia_hasta).isBefore(endDateObj) : true)
      );          
      if (checkedStates.every((value) => !value)) {
        setConcursos([]);
      } else {
        const selectedStates = checkedStates
          .slice(1)
          .map((isChecked, i) => isChecked ? estados[i + 1] : null) // Obtener los estados tildados
          .filter((estado) => estado !== null);
        filteredResult = filteredResult.filter((concurso) =>
          selectedStates.some((selectedState) =>
          concurso.estado_seguimiento_concurso.toLowerCase().includes(selectedState.toLowerCase())
          )
        );
        const selectedTypes = checkedTypes
          .map((isChecked, i) => isChecked ? tiposConcurso[i]?.tipo_concurso_id : undefined)
          .filter((tipo) => tipo !== undefined);
        filteredResult = filteredResult.filter((concurso) =>
          selectedTypes.includes(concurso.tipo_concurso)
        );            
        setConcursos(filteredResult);
      }        
    }        
  };

  //limpia el filtro 
  const handleClearSearch = () => {
    setSearchTerm("");
    setCheckedStates(new Array(checkedStates.length).fill(true));
    setCheckedTypes(new Array(checkedTypes.length).fill(true));
    setStartDate(null);
    setEndDate(null);
    setError('');
    setConcursos(data);
  };

  // Función que maneja el toggling del estado en un índice específico del arreglo checkedStates
  const handleToggleEstado = (index) => {
    // Crea un nuevo arreglo llamado newCheckedStates que es una copia del arreglo checkedStates
    const newCheckedStates = [...checkedStates];    
    // Invierte el valor en el índice especificado
    newCheckedStates[index] = !newCheckedStates[index];    
    // Si el índice toggleado es el primero (index 0), actualiza todos los valores en newCheckedStates al mismo valor
    if (index === 0) {
      if (newCheckedStates[0]) {
        // Si el primer valor es verdadero, actualiza todos los valores a verdadero
        newCheckedStates.fill(true);
      } else {
        // Si el primer valor es falso, actualiza todos los valores a falso
        newCheckedStates.fill(false);
      }
    } else {
      // Si el índice toggleado no es el primero, verifica si todos los valores en newCheckedStates son verdaderos
      if (newCheckedStates.every((state) => state)) {
        // Si todos los valores son verdaderos, actualiza el primer valor a falso
        newCheckedStates[0] = false;
      } else if (newCheckedStates.slice(1).every((state) => state)) {
        // Si todos los valores excepto el primero son verdaderos, actualiza el primer valor a verdadero
        newCheckedStates[0] = true;
      } else {
        // Si algunos valores son falsos, actualiza el primer valor a falso
        newCheckedStates[0] = false;
      }
    }    
    // Actualiza el estado con el nuevo arreglo de estados marcados
    setCheckedStates(newCheckedStates);
  };   

  //constante para tildar los tipos de concurso
  const handleToggleTypes = (index) => {
    const newCheckedTypes = [...checkedTypes];
    newCheckedTypes[index] = !newCheckedTypes[index];
    setCheckedTypes(newCheckedTypes);    
  };

  //valida si las fechas son validas
  const handleDateChange = (date, setDate) => {
    if (date && date.isValid()) {
      setDate(date);
      setError('');
    } else {
      setError('Por favor, ingrese una fecha válida.');
    }
  };
   
  //muestra un error si no se ingresaron ambas fechas o si la fecha de inicio
  //es menor a la fecha fin
  const validateDates = () => {
    if (!startDate & !endDate) {
      setError('');
    }else if (!startDate || !endDate){
      setError('Por favor, ingrese ambas fechas.');
    } else if (startDate.isAfter(endDate)) {
      setError('La fecha de inicio debe ser menor o igual a la fecha de fin.');
    } 
  };


  return(
    <>
      <Accordion disableGutters 
        sx={{        
         backgroundColor:"secondary.main",
         boxShadow:0,
         }}>
        <AccordionSummary           
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="body1" 
            sx={{ 
              alignSelf: 'center',
              marginLeft: 2, 
              marginRight: 2,     
              width:"100%",
              display:"flex",
              justifyContent:"flex-end"  
            }}>
            Filtros
          </Typography> 
        </AccordionSummary>
        <AccordionDetails sx={{padding:0,mx:"auto" }} >
          <Grid item container fixed="true" 
            justifyContent={{xs:"flex-start", xm:"flex-start", sm:"space-evenly"}}
            sx={{         
              backgroundColor:"secondary.main",
              display:"flex", 
              flexDirection:"row", 
              padding:1,        
              gap:2,
              boxSizing:"border-box",
            }}
          >             
            <FormGroup  
              sx={{ 
                display:"flex", 
                flexDirection:"column", 
                mx:{xs:"auto", sm:1}, width:{xs:"90%", sm:"60%", md:"40%"}
                }}
            >  
              <Typography variant="body1" 
                sx={{ alignSelf: 'center', marginLeft:2, marginRight:2}}
              >
                  Denominacion
              </Typography>  
              <Paper
                component="form" 
                sx={{ p: 0, display: 'flex', alignItems: 'center', height:50}}
              >
                <InputBase
                  sx={{  
                    width: "100%", p:1,                
                  }} 
                  placeholder="Denominacion Concurso"
                  inputProps={{ 'aria-label': 'search google maps' }} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}          
                />                                
              </Paper> 
            </FormGroup>   
            <FormGroup sx={{ display:"flex", flexDirection:"column", mx:"auto"}}>          
              <Typography variant="body1" 
                sx={{ 
                  alignSelf: 'center', 
                  marginLeft: 2, 
                  marginRight: 2 
                }}
              >
                Estados
              </Typography>
              {estados.map((etiqueta, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={checkedStates[index]} onChange={() => handleToggleEstado(index)} size="small" />}
                  label={etiqueta}            
                />
              ))}
            </FormGroup>         
            <FormGroup 
              sx={{ 
                display:"flex", 
                flexDirection:"column", 
                gap:1, width:{xs:220, xm:230, sm:220, md:165, lg:240}, 
                mx:"auto"
              }}
            > 
              <Typography variant="body1" 
                sx={{ alignSelf: 'center', marginLeft: 2, marginRight: 2 }}
              >
                Vigencia
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} > 
                <Paper>
                  <DatePicker
                    label="Fecha Inicio"
                    value={startDate}
                    onChange={(date) => handleDateChange(date, setStartDate)}
                    sx={{ width: '100%' }}
                  />
                </Paper>
                <Paper>
                  <DatePicker
                    label="Fecha Fin"
                    value={endDate}
                    onChange={(date) => handleDateChange(date, setEndDate)}
                    sx={{ width: '100%' }}
                  />
                </Paper>
                {error && 
                  <Typography variant="body1" sx={{color: "error.main",  }}>
                    {error}
                  </Typography>
                }              
              </LocalizationProvider>
            </FormGroup> 
            <FormGroup sx={{ display:"flex", flexDirection:"column", mx:"auto"}}>          
              <Typography variant="body1" 
                sx={{ alignSelf: 'center', marginLeft: 2, marginRight: 2 }}
              >
                Tipos
              </Typography>
              {tiposConcurso && tiposConcurso.map((tipo, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox 
                      checked={checkedTypes[index]} 
                      onChange={() => handleToggleTypes(index)} size="small" 
                    />
                  }
                  label={tipo.descripcion_tipo_concurso}
                />
              ))}
            </FormGroup>             
            <FormGroup sx={{ display:"flex", flexDirection:{xs:"row",sm:"row"}, gap:1, width:"98%", justifyContent:{xs:"center",sm:"flex-end"}}}>   
              <Button size="small" variant="contained" onClick={handleClearSearch} startIcon={<DeleteIcon />} >
                <Typography variant="body1" sx={{ alignSelf: 'center', }}>
                  Limpiar filtros
                </Typography>
              </Button>  
              <Button size="small" variant="contained" onClick={handleSearchClick} startIcon={<SearchIcon />} >
                <Typography variant="body1" sx={{ alignSelf: 'center',}}>
                  Buscar
                </Typography>
              </Button> 
            </FormGroup>
          </Grid>
        </AccordionDetails>
      </Accordion>      
      <Grid item container fixed="true" 
        spacing={3}
        xs={12} 
        justifyContent='center'
        alignItems="center"
        gap={3}
        sx={{
          position: "relative",
          boxSizing:"border-box",  
          padding:1,  
          display:"flex", 
          flexWrap: "wrap",  
          mt:1,
        }}
      >         
        {concursos && concursos.map((concurso, index) => (
          <Grid item 
            xs={12} sm={5} md={3} lg={2.5} key={index}         
          >          
            <Card  key={concurso.concurso_id} 
              sx={{ 
                maxWidth: 345, 
                height: 350,                
                display:"flex",
                flexDirection:"column",   
                mx:"auto", 
              }}
            > 
              <Box sx={{display:"flex", padding:0.5}}>
                <Chip label={getDescriptionById(concurso.tipo_concurso)} size="small" disabled/>
                <Chip label="Numero" size="small" disabled color="info" />
              </Box>            
              <CardActionArea component={Link} href="https://www.pol.una.py/" target="_blank"               
                sx={{ 
                  height: 270,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >            
                <CardMedia
                  component="img"
                  height="140"
                  image={foto}
                  alt="green iguana"              
                />
                <CardContent>
                  <Typography gutterBottom 
                    variant="h5" 
                    component="div" 
                    textAlign={"center"}
                    fontWeight="bold"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 4, // Número de líneas deseado
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {concurso.denominacion_conc}
                  </Typography>                
                </CardContent>
              </CardActionArea>
              <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => handlePostularClick(concurso)}
                >
                  Postular
                </Button>   
                <Tooltip title={mostrarMensaje(concurso.estado_seguimiento_concurso)} arrow>   
                  <InfoIcon fontSize="small"  sx={{alignSelf:"flex-end", color:mostrarEstado(concurso.estado_seguimiento_concurso)}}/>         
                </Tooltip> 
              </CardActions>
            </Card>      
          </Grid>
        ))}
      </Grid>
    </>
  )
}


export default ConcursoCard;