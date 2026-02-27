import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Afiliaciones
export const uploadAfiliaciones = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API}/afiliaciones/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getAfiliaciones = async () => {
  const response = await api.get('/afiliaciones');
  return response.data;
};

export const searchAfiliacion = async (codigo) => {
  const response = await api.get(`/afiliaciones/search?q=${codigo}`);
  return response.data;
};

// Trouble Tickets
export const uploadTT = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API}/tt/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getAllTT = async () => {
  const response = await api.get('/tt');
  return response.data;
};

export const getTTByFolio = async (folio) => {
  const response = await api.get(`/tt/${folio}`);
  return response.data;
};

// Documentos
export const generarDocumento = async (formData) => {
  try {
    const response = await axios.post(`${API}/documentos/generar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob',
      timeout: 60000 // 60 segundos timeout
    });
    return response;
  } catch (error) {
    // Si el error tiene una respuesta blob, intentar leerla como JSON
    if (error.response && error.response.data instanceof Blob) {
      const text = await error.response.data.text();
      try {
        const jsonError = JSON.parse(text);
        error.response.data = jsonError;
      } catch (e) {
        // No es JSON, mantener el texto
        error.response.data = { detail: text };
      }
    }
    throw error;
  }
};

export const getDocumentos = async () => {
  const response = await api.get('/documentos');
  return response.data;
};

export const downloadDocumento = async (docId, filename) => {
  const response = await axios.get(`${API}/documentos/${docId}/download`, {
    responseType: 'blob'
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default api;
