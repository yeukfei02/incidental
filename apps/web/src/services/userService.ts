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

export const getUserById = async (token: string, id: string) => {
  const response = await axios.get(`${rootUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateUserById = async (
  token: string,
  id: string,
  name: string,
  email: string
) => {
  const data = {
    name: name,
    email: email,
  };
  const response = await axios.patch(`${rootUrl}/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const changePassword = async (
  token: string,
  id: string,
  password: string
) => {
  const data = {
    password: password,
  };
  const response = await axios.patch(
    `${rootUrl}/users/${id}/changePassword`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
