import { UserContext } from '@ctx/UserContext';
import React, { useContext } from 'react';
import ErrorPages from 'src/common/ui/layouts/ErrorPages';
import WaitingPage from 'src/common/ui/layouts/WaitingPage';

type TProps = {
  children: React.ReactElement;
  fallback?: React.ReactElement;
};
const AuthCheck = ({ children, fallback = <ErrorPages /> }: TProps): JSX.Element => {
  const { isLogged, loading } = useContext(UserContext);
  if (loading) return <WaitingPage />;
  return isLogged ? children : fallback;
};

export default AuthCheck;
