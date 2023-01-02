import axios from 'axios';
import { UserRole } from '@prisma/client';
import { getRootUrl } from '../helper/helper';

const rootUrl = getRootUrl();

export const signup = async (
  name: string,
  email: string,
  password: string,
  userRoles: UserRole[]
) => {
  const data = {
    name: name,
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

export const getNormalUsers = async (token: string) => {
  const response = await axios.get(`${rootUrl}/users/list/normalUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
