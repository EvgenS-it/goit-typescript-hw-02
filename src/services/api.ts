import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../components/App/App.types';

const requestImages = async (query: string, page = 1): Promise<ApiResponse> => {
  const { data } = await axios.get<ApiResponse>(
    'https://api.unsplash.com/search/photos',
    {
      params: {
        query,
        page,
        per_page: 12,
        orientation: 'landscape',
      },
      headers: {
        Authorization: 'Client-ID dLBR2aie19Pf8Zk_xUX3vQu4vQ20Et0vPLq_v8BBqmM',
      },
    }
  );
  return data;
};

export default requestImages;

// const requestImages = async <T>(
//   query: string,
//   page = 1
// ): Promise<AxiosResponse<T>> => {
//   const { data } = await axios.get<AxiosResponse<T>>(
//     'https://api.unsplash.com/search/photos',
//     {
//       params: {
//         query,
//         page,
//         per_page: 12,
//         orientation: 'landscape',
//       },
//       headers: {
//         Authorization: 'Client-ID dLBR2aie19Pf8Zk_xUX3vQu4vQ20Et0vPLq_v8BBqmM',
//       },
//     }
//   );
//   return data;
// };

// export default requestImages;
