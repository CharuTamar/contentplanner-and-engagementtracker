// src/services/contentService.js
import axios from 'axios';
const API = 'http://localhost:5000/api/content';

const getAllContent = () => axios.get(API).then((res) => res.data);
const getContentById = (id) => axios.get(`${API}/${id}`).then((res) => res.data);
const createContent = (data) => axios.post(API, data).then((res) => res.data);
const updateContent = (id, data) => axios.put(`${API}/${id}`, data).then((res) => res.data);
const deleteContent = (id) => axios.delete(`${API}/${id}`).then((res) => res.data);
const engage = async (contentId, type) => {
  const res = await axios.patch(`${API}/${contentId}/engage`, { type });
  return res.data;
};


export default {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  engage
};
