import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

function PrivateRoute(props: Props) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default PrivateRoute;
