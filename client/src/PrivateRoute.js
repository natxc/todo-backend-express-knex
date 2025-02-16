import useAuth from './hooks/useAuth';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
    console.log('User in PrivateRoute:', user);
    return element;
};

export default PrivateRoute;
