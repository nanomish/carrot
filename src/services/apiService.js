import _ from 'lodash';
let instance = null;
const apiServer = '192.168.1.12:8080';
export class APIService {

  constructor(){
    if(instance){
      return instance;
    }

    this.instance = this;
  }

  getApiServer() {
    return apiServer;
  }

  executePOSTRequest(endPoint, paramsObj, postObj, options) {
    console.log('executePOSTRequest, paramsObj: ', paramsObj);
    console.log('executePOSTRequest, postObj: ', postObj);
    let queryString = this.createQueryString(paramsObj);
    return fetch(`http://${this.getApiServer()}/api/${endPoint}${queryString}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObj)
    })
      .then(response => response.json())
  }

  executeGETRequest(endPoint, paramsObj, options) {
    let queryString = this.createQueryString(paramsObj);

    return fetch(`http://${this.getApiServer()}/api/${endPoint}${queryString}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
  }

  createQueryString(paramsObj) {
    let queryString = '';
    _.forOwn(paramsObj, (value, key) => {
      queryString += `${key}=${encodeURIComponent(value)}`;
    });

    if (queryString) {
      queryString = `?${queryString}`;
    }
    return queryString;
  }
}