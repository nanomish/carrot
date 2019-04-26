/**
 * Created by mkushnir on 05/01/2019.
 */
import {LocalStorageService} from '../localStorage/localStorage.service';
import {APIService} from '../services/apiService';
let instance = null;
export class LoginService {

  constructor() {
    if (instance) {
      return instance;
    }

    this.state = "duke";
    this.instance = this;
  }

  getListOfLists() {
    var paramsObj = {};

    APIService.executeGETRequest('/lists', paramsObj);
  }
}