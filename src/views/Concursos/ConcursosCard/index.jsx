import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material"
import foto from "./../../../assets/nuevo_concurso.png"
import { useConcursoData, useServerStore } from "../../../state/useState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckboxesTags from "../../../components/FiltroEtiquetas";

const ConcursoCard = () =>{
  const {localhost} = useServerStore();
  const apiUrl = `http://${localhost}:8000/concurso/concurso/`;
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const concursoDataStore = useConcursoData();
    

    useEffect(() => {
        // Hacer la solicitud HTTP
        fetch(apiUrl, {
          method: 'GET',  // Método de la solicitud
          headers: {
            'Accept': 'application/json',
          },
          // Puedes agregar más opciones como body si es necesario
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            // Guardar los datos en el estado
            setData(data);
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
       
      }, [apiUrl]); // Se ejecuta cuando el componente se monta y cuando cambia la URL
    
      // Renderizar el componente con base en el estado de "data"
      const handlePostularClick = (concurso) => {
        // Redirigir a la ruta de postulación
        concursoDataStore.setConcursoData(concurso);
        console.log("postular")
        // navigate(`postulacion`);
      };


      // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

    return(
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
        }}
      >       
      {/* <CheckboxesTags etiquetas={top100Films}/> */}
      {data && data.map((concurso, index) => (
        <Grid item 
          xs={12} sm={5} md={3} lg={2} key={index}         
        >
          <Card  key={concurso.concurso_id} 
            sx={{ 
              maxWidth: 345, 
              height: 320,                
              display:"flex",
              flexDirection:"column",        
            }}
          >
            <CardActionArea                 
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
              <CardActions>
                <Button size="small" color="primary">
                 Postular
                </Button>
              </CardActions>
              </Card>
        </Grid>
      ))}
        </Grid>
    )
}

export default ConcursoCard;