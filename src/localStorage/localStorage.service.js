import {openDb, deleteDb} from 'idb';

let instance = null;
const KEYVAL = 'carrot-keyval';

export class LocalStorageService {

  constructor(){
    if(instance){
      return instance;
    }

    instance = this;

    instance.dbPromise = openDb('keyval-store', 1, upgradeDB => {
      upgradeDB.createObjectStore(KEYVAL);
    });

    this.init();
  }

  init() {
    instance.idb = {
      async get(key) {
        const db = await instance.dbPromise;
        return db.transaction(KEYVAL).objectStore(KEYVAL).get(key);
      },
      async set(key, val) {
        const db = await instance.dbPromise;
        const tx = db.transaction(KEYVAL, 'readwrite');
        tx.objectStore(KEYVAL).put(val, key);
        return tx.complete;
      },
      async delete(key) {
        const db = await instance.dbPromise;
        const tx = db.transaction(KEYVAL, 'readwrite');
        tx.objectStore(KEYVAL).delete(key);
        return tx.complete;
      },
      async clear() {
        const db = await instance.dbPromise;
        const tx = db.transaction(KEYVAL, 'readwrite');
        tx.objectStore(KEYVAL).clear();
        return tx.complete;
      },
      async keys() {
        const db = await instance.dbPromise;
        return db.transaction(KEYVAL).objectStore(KEYVAL).getAllKeys();
      },
    };
  }
}