
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    return isAuthenticated ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired
};

export default ProtectedRoute;
