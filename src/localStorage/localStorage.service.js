import {openDb, deleteDb} from 'idb';

let instance = null;
const DBNAME = 'carrot-keyval';

export class LocalStorageService {

  constructor(){
    if(instance){
      return instance;
    }

    instance = this;

    instance.dbPromise = openDb('keyval-store', 1, upgradeDB => {
      upgradeDB.createObjectStore(DBNAME);
    });

    this.init();
  }

  init() {
    instance.idb = {
      async get(key) {
        const db = await instance.dbPromise;
        const result = db.transaction(DBNAME).objectStore(DBNAME).get(key);
        return result;
      },
      async set(key, val) {
        const db = await instance.dbPromise;
        const tx = db.transaction(DBNAME, 'readwrite');
        tx.objectStore(DBNAME).put(val, key);
        return tx.complete;
      },
      async delete(key) {
        const db = await instance.dbPromise;
        const tx = db.transaction(DBNAME, 'readwrite');
        tx.objectStore(DBNAME).delete(key);
        return tx.complete;
      },
      async clear() {
        const db = await instance.dbPromise;
        const tx = db.transaction(DBNAME, 'readwrite');
        tx.objectStore(DBNAME).clear();
        return tx.complete;
      },
      async keys() {
        const db = await instance.dbPromise;
        return db.transaction(DBNAME).objectStore(DBNAME).getAllKeys();
      },
    };
  }
}