type StorageValue<T> = T | null;

interface IStorage {
  set: <T>(key: string, value: T, options?: Record<string, any>) => void;
  get: <T>(key: string) => StorageValue<T>;
  remove: (key: string) => void;
  clear: () => void;
}

function createWrapper(storage: Storage): IStorage {
  return {
    set<T>(key: string, value: T, options?: Record<string, any>): void {
      const data = options?.transform ? options.transform(value) : value;
      storage.setItem(key, JSON.stringify(data));
      options?.debug && console.log(`[Storage] set ${key}:`, data);
    },

    get<T>(key: string): StorageValue<T> {
      const item = storage.getItem(key);
      if (item === null) return null;

      try {
        const value = JSON.parse(item);
        if (
          typeof value === 'object' &&
          value !== null &&
          typeof value._type === 'string'
        ) {
          return DataFactory[value._type]?.deserialize?.(value) ?? value;
        }
        return value as T;
      } catch (error) {
        console.error(`[Storage] parse error: ${key}=${item}, error:`, error);
        return null;
      }
    },

    remove(key: string): void {
      storage.removeItem(key);
    },

    clear(): void {
      storage.clear();
    },
  };
}

interface IData {
  _type: string;
  serialize: () => string;
}

interface IDataFactory<T extends IData> {
  deserialize: (data: any) => T;
}

const DataFactory: Record<string, IDataFactory<any>> = {
  Date: {
    deserialize: (data: any) => new Date(data.value),
  },
  RegExp: {
    deserialize: (data: any) => new RegExp(data.source, data.flags),
  },
  Set: {
    deserialize: (data: any) => new Set(data.value),
  },
  Map: {
    deserialize: (data: any) => new Map(Object.entries(data.value)),
  },
};

/** cookie */
export const CStorage = createWrapper(document.cookie as any);
/** 会话缓存 */
export const SStorage = createWrapper(sessionStorage);
/** 本地缓存 */
export const storage = createWrapper(localStorage);
export default storage;
