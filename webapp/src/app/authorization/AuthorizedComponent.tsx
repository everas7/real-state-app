import React from 'react';
import { RouteProps } from 'react-router-dom';

import { selectAuthenticatedUser } from '../../features/access/services/accessSlice';
import { Role } from '../models/role';
import { User } from '../models/user';
import { useAppSelector } from '../store/hooks';

export const AuthorizedComponent: React.FC<any> = ({
  children,
  rolesAllowed,
  customValidation,
}) => {
  const user = useAppSelector(selectAuthenticatedUser);
  let isAllowed = true;
  if (rolesAllowed) {
    isAllowed = isAllowed && rolesAllowed.includes(user!.role);
  }

  if (customValidation) {
    isAllowed = isAllowed && customValidation(user!);
  }
  if ((children as React.ReactNode[]).length) {
    return (
      <>
        {isAllowed
          ? (children as React.ReactNode[])[0]
          : (children as React.ReactNode[])[1]}
      </>
    );
  }
  return <>{isAllowed ? children : null}</>;
};
