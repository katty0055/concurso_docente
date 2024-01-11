// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useUserData } from '../../state/useState';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
  const { userId } = useUserData();

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  return userId ? element : <Navigate to="/" replace />;
};

PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
  };

export default PrivateRoute;