import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../components/commons/loading/Loading';
import { useGetAuthUserQuery } from '../store/api';
import { selectAuthenticated } from '../store/auth/selector';

type Props = {
  children: JSX.Element;
};

const RequireAuth = (props: Props) => {
  const { data, isLoading } = useGetAuthUserQuery('');
  const auth = useSelector(selectAuthenticated);
  const { children } = props;

  if (isLoading) return <Loading />;

  if (!data && !auth) return <Navigate to="/login" />;

  return children;
};

export default RequireAuth;
