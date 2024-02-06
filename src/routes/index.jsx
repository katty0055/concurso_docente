//componente donde estan las rutas
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Pagina from "../views/Pagina";
import Login from "../views/Inicio";

const router = createBrowserRouter([
    // Definición de rutas
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'concurso_docente/',
        element: <Pagina/>,   
    },    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
