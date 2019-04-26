/**
 * Created by mkushnir on 05/01/2019.
 */
import {LocalStorageService} from '../localStorage/localStorage.service';
import {APIService} from '../services/apiService';
let instance = null;
const TOKEN = 'token';
const EMAIL = 'email';
var localStorage;
var apiService;

export class LoginService {

  constructor() {
    if (instance) {
      return instance;
    }

    this.state = "duke";
    this.instance = this;

    apiService = new APIService();
    localStorage = new LocalStorageService();
    localStorage.idb.set('key', 'value99');

    localStorage.idb.get('key').then(response => {
      console.log('get sample value: ', response);
    });
  }

  setToken(token) {
    return localStorage.idb.set(TOKEN, token);
  }

  async setLoginData(token, email) {
    await localStorage.idb.set(TOKEN, token);
    var res = await localStorage.idb.set(EMAIL, email);
    return res;
  }

  isLoggedIn() {
    return localStorage.idb.get(TOKEN).then(token => {
      console.log('isLoggedIn, token: ', token);
      return !!token;
    });
  }

  login(obj) {
    return apiService.executePOSTRequest('login', null, obj);
  }
}