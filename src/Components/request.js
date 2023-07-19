
import axios from 'axios';
export const request = async (request) => {
    try {
      const response = await axios.get(request);
      const resultats = response.data;
      return resultats;
    } catch (error) {
      console.error('Erreur lors de la requête API :', error);
      return [];
    }
  };