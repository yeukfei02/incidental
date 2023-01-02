import axios from 'axios';
import { UserRole, IncidentType, Status } from '@prisma/client';
import { getRootUrl } from '../helper/helper';

const rootUrl = getRootUrl();

export const createIncident = async (
  token: string,
  title: string,
  description: string,
  type: IncidentType,
  creatorId: string,
  userRole: UserRole
) => {
  const data = {
    title: title,
    description: description,
    type: type,
    creatorId: creatorId,
    userRole: userRole,
  };

  const response = await axios.post(`${rootUrl}/incidents/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getIncidents = async (
  token: string,
  userRole: UserRole,
  userId: string,
  searchText?: string
) => {
  const params = {
    userRole: userRole,
    userId: userId,
    ...(searchText && { searchText: searchText }),
  };

  const response = await axios.get(`${rootUrl}/incidents/list`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getIncidentById = async (token: string, id: string) => {
  const response = await axios.get(`${rootUrl}/incidents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const assignIncident = async (
  token: string,
  id: string,
  assigneeId: string
) => {
  const data = {
    assigneeId: assigneeId,
  };
  const response = await axios.patch(
    `${rootUrl}/incidents/${id}/assignIncident`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateIncidentStatus = async (
  token: string,
  id: string,
  status: Status
) => {
  const data = {
    status: status,
  };
  const response = await axios.patch(
    `${rootUrl}/incidents/${id}/updateIncidentStatus`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteIncidentById = async (token: string, id: string) => {
  const response = await axios.delete(`${rootUrl}/incidents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
