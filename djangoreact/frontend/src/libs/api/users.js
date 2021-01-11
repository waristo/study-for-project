import axios from 'axios';
import {jsonHeader, urls, naverNewsHeader} from '../reqConf';

export const postAuthJwt = async (query) => {
  const resp = await axios.get(`/v1/search/news?query=${query}`, naverNewsHeader());
  return resp.data;
};
