import fiberZonesMock from '../data/fiberZones.json';

export const getFiberZones = async () => {
  // Later, once backend is ready, replace the line below with something like:
  // const res = await axiosInstance.get('/coverage/zones');
  // return res.data;

  return fiberZonesMock;
};