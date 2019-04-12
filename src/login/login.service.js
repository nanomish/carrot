/**
 * Created by mkushnir on 05/01/2019.
 */
import {LocalStorageService} from '../localStorage/localStorage.service';

let instance = null;
const TOKEN = 'token';
var localStorage;

export class LoginService {

    constructor(){
        if(instance){
            return instance;
        }

        this.state = "duke";
        this.instance = this;

        localStorage = new LocalStorageService();
        localStorage.idb.set('key', 'value99');

      localStorage.idb.get('key').then(response => {
        console.log('get: ', response);
      });
    }

    setToken(token) {
      return localStorage.idb.set(TOKEN, token);
    }

    isLoggedIn() {
        return localStorage.idb.get(TOKEN).then(token => {
          return !!token;
        });
    }
}