import axios from 'axios';
import { UserRole, IncidentType } from '@prisma/client';
import { getRootUrl } from '../helper/helper';

const rootUrl = getRootUrl();

export const createIncident = async (
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

  const response = await axios.post(`${rootUrl}/incidents/create`, data);
  return response;
};

export const listIncidents = async (userRole: UserRole, userId: string) => {
  const params = {
    userRole: userRole,
    userId: userId,
  };

  const response = await axios.get(`${rootUrl}/incidents/list`, {
    params: params,
  });
  return response;
};
