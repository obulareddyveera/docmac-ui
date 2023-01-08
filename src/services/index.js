import Axios from 'axios';

function ServiceBase() {
  this.get = (api, params) => {
    console.log('--==> GET ', api, params);
    return Axios.get(api, params);
  };
  this.post = (api, params) => {
    console.log('--==> POST ', api, params);
    return Axios.post(api, params);
  };
  this.put = (api, params) => {
    console.log('--==> PUT ', api, params);
    return Axios.put(api, params);
  };
}
export default new ServiceBase();