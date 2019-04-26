/**
 * Created by mkushnir on 05/01/2019.
 */
import {LocalStorageService} from '../localStorage/localStorage.service';
import {APIService} from '../services/apiService';

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

    getListOfLists() {
      APIService.executeGETRequest();
    }
}