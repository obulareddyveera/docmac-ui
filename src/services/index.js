import Axios from 'axios';

function ServiceBase() {
  this.get = (url, params) => {
    return Axios.get(`${url}?&timestamp=${new Date().getTime()}`, params);
  };
  this.post = (url, params) => {
    return Axios.post(`${url}?&timestamp=${new Date().getTime()}`, params);
  };
  this.put = (url, params) => {
    return Axios.put(`${url}?&timestamp=${new Date().getTime()}`, params);
  };
}
export default new ServiceBase();