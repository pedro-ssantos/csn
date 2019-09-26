import axios from 'axios';

class apiService {

  constructor() {
    this.config = {
    	apiUrl: 'http://censoapi:3000/api'
    }
  }

  getApiUrl = () => this.config.apiUrl;

  request = async (method, urlSuffix, options) => {
    let request = {
      method: method,
      url: this.config.apiUrl+'/'+urlSuffix,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    };
    if (options) {
      if (options.hasOwnProperty('data')) {
        request.data = options.data;
      }
      if (options.hasOwnProperty('params')) {
        request.params = options.params;
      }
      if (options.hasOwnProperty('headers')) {
        for (let key in options.headers) {
          request.headers[key] = options.headers[key];
        }
      }
    }
    return axios(request)
  }
}

const instance = new apiService();

export default instance;
