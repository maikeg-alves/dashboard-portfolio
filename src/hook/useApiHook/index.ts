/* import { useState } from 'react';
import ApiManager from '../ApiManger'; // Substitua pelo caminho correto do seu arquivo

const useApiHook = (url: string) => {
  const [apiManager] = useState(new ApiManager('sua_url_da_api')); // Substitua pela URL real da sua API

  const getData = async <T>() => {
    try {
      const data: T = await apiManager.getData();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  };

  const postData = async <T>(dados: T) => {
    try {
      const data: T = await apiManager.postData(dados);
      return data;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      throw error;
    }
  };

  return { getData, postData };
};

export default useApiHook;
 */
