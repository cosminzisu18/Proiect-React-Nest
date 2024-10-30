import axios from 'axios';
import toastService from './toastService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/portfolio'; 

export const getPortfolios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error('Eroare la obținerea portofoliilor:', error);
    
    if (error.response && error.response.status === 429) { // 429 - eroarea ca utilizatorul a trimis prea multe cereri
      toastService.error(error.response.data.message);
    }

    return []; 
  }
};

export const getPortfolioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Eroare la obținerea portofoliului cu ID-ul ${id}:`, error);
    return null; 
  }
};


export const createPortfolio = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Eroare la trimiterea datelor:', error);
    
    let errorMessage = 'Eroare la trimiterea datelor!';

    if (error.response && error.response.data && Array.isArray(error.response.data.message)) {
      errorMessage = 'Eroare de validare: ' + (error.response.data.message[0] || 'Eroare necunoscută');  // am folosit [0], deoarece vreau sa afisez pe rand erorile
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message; 
    }

    throw new Error(errorMessage);
  }
};


export const updatePortfolio = async (formData) => {
  try {
      const response = await axios.put(`${API_URL}/${formData.get('id')}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Eroare la actualizarea portofoliului:', error);
      
      let errorMessage = 'Eroare la actualizarea portofoliului!';

      if (error.response && error.response.data && Array.isArray(error.response.data.message)) {
          errorMessage = 'Eroare de validare: ' + (error.response.data.message[0] || 'Eroare necunoscută');  // am folosit [0], deoarece vreau sa afisez pe rand erorile
      } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message; 
      }

      throw new Error(errorMessage);
  }
};





export const deletePortfolio = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Eroare la ștergerea portofoliului cu ID-ul ${id}:`, error); 
    throw new Error('Eroare la ștergerea portofoliului: ' + error.message);
  }
};
