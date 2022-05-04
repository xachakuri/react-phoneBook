import axios from 'axios';

const mainAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getPhonesApi = async () => await mainAxios.get('/phones/');

export const deletePhoneByIdApi = async ({ id }) => await mainAxios.delete(`/phones/${id}`);

export const postPhoneApi = async ({ id, nameUser, phone, city, dateRegistration }) =>
  await mainAxios.post('/phones/', {
    id: id,
    nameUser: nameUser,
    city: city,
    dateRegistration: dateRegistration,
    phone: phone,
  });

export const putPhoneApi = async ({ id, nameUser, phone, city, dateRegistration }) =>
  await mainAxios.put(`/phones/${id}`, {
    nameUser: nameUser,
    city: city,
    dateRegistration: dateRegistration,
    phone: phone,
  });
