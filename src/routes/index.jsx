//componente donde estan las rutas
import { createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import Pagina from "../views/Pagina";
import Login from "../views/Inicio";
import PrivateRoute from "../views/Inicio/PrivateRoute";

const router = createBrowserRouter([
    // Definición de rutas
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'concurso_docente/',
        element: <PrivateRoute element={<Routes>
            <Route path="/" element={<Pagina />} />
            {/* Agrega otras rutas secundarias aquí si es necesario */}
          </Routes>} />,    
    },    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
