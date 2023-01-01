import axios from 'axios';
import { UserRole } from '@prisma/client';
import { getRootUrl } from '../helper/helper';

const rootUrl = getRootUrl();

export const signup = async (
  email: string,
  password: string,
  userRoles: UserRole[]
) => {
  const data = {
    email: email,
    password: password,
    userRoles: userRoles,
  };

  const response = await axios.post(`${rootUrl}/users/signup`, data);
  return response;
};

export const login = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password,
  };

  const response = await axios.post(`${rootUrl}/users/login`, data);
  return response;
};
