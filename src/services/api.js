import axios from 'axios';

const requestImages = async (query, page = 1) => {
  const { data } = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query,
      page,
      orientation: 'landscape',
    },
    headers: {
      Authorization: 'Client-ID dLBR2aie19Pf8Zk_xUX3vQu4vQ20Et0vPLq_v8BBqmM',
    },
  });
  return data;
};

export default requestImages;
