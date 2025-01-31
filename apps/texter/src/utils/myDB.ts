/**基于原生IndexedDB的数据库封装(API对齐localStorage) */
export class IndexedDBStorage {
  dbName: any;
  storeName: any;
  db: any;
  constructor(tablePath: string) {
    if (tablePath.includes('.')) {
      const [dbName, storeName] = tablePath.split('.');
      this.dbName = dbName;
      this.storeName = storeName;
    } else {
      this.dbName = 'texter';
      this.storeName = tablePath;
    }
    /**初始化数据库 */
    this.db = null;
  }
  async open() {
    if (this.db) return;
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
      request.onupgradeneeded = (event: any) => {
        if (!event.target?.result) {
          return;
        }
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: 'key',
          autoIncrement: true,
        });
      };
    });
  }

  async getItem(key: any) {
    await this.open();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);
      request.onsuccess = () => {
        resolve(request.result ? request.result.value : null);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async setItem(key: any, value: any) {
    await this.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ key, value });
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async removeItem(key: any) {
    await this.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async clear() {
    await this.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async length() {
    await this.open();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.count();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async key(index: number) {
    await this.open();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.openCursor();
      let count = 0;
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor && count === index) {
          resolve(cursor.key);
        } else if (cursor) {
          cursor.continue();
          count++;
        } else {
          resolve(null);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

export default IndexedDBStorage;
