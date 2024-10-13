import { openDB, IDBPDatabase } from 'idb';
import { useCallback, useLayoutEffect, useRef } from 'react';

export const getIndexedDBNames = async () => {
  try {
    const databases = await indexedDB.databases();
    return databases.map((database) => database.name);
  } catch (error) {
    console.error('获取 IndexedDB 名称失败:', error);
    return [];
  }
};
export enum DBNameType {
  /**系统表*/
  SYSTEM_DB_NAME = 'texter',
}
export enum DBTableNameType {
  /**系统配置参数*/
  SYSTEM_TABLE_NAME = 'config',
}

const DB_VERSION = 1;

/**
 * 创建数据库
 * @param DBName 数据库名称
 * @returns 数据库实例
 */
const DBMap = new Map();

export const createDB = async (
  DBName: string,
  tableName: string = DBTableNameType.SYSTEM_TABLE_NAME
) => {
  const key = `${DBName}:${tableName}`;
  if (DBMap.has(key)) {
    return DBMap.get(key);
  }
  const tempDB = await openDB(DBName, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(tableName);
    },
  });
  DBMap.set(key, tempDB);
  return tempDB;
};

/**
 * 获取数据库实例
 * @param DBName 数据库名称
 * @returns 数据库实例
 */
export const getDB = async (
  DBName: string,
  tableName: string = DBTableNameType.SYSTEM_TABLE_NAME
) => {
  const key = `${DBName}:${tableName}`;
  let db = DBMap.get(key);
  if (!db) {
    db = await createDB(DBName, tableName);
  }
  return db;
};

// 建表
export const createTable = async (DBName: string, tableName: string) => {
  const db = await getDB(DBName, tableName);
  return db;
};
// 获取所有表名
export const getTableNames = async (
  DBName: string = DBNameType.SYSTEM_DB_NAME
) => {
  const db = await getDB(DBName);
  return db.getAllKeys(DBName);
};

/**
 * 使用数据库实例 hooks
 * @param DBName 数据库名称
 * @returns 数据库实例
 */

export const useDBInstance = (
  DBName: string = DBNameType.SYSTEM_DB_NAME,
  tableName: string = DBTableNameType.SYSTEM_TABLE_NAME
) => {
  const dbRef = useRef<IDBPDatabase<any> | null>(null);
  const init = useCallback(async () => {
    try {
      const dbPromise = await getDB(DBName, tableName);
      dbRef.current = dbPromise;
    } catch (error) {
      console.error('数据库初始化失败:', error);
    }
  }, [DBName, tableName]);

  useLayoutEffect(() => {
    init();
    return () => {
      dbRef.current = null; // 清理数据库引用
    };
  }, [init]);

  const executeDBOperation = async (
    operation: string,
    key: string,
    val?: any
  ) => {
    const db = dbRef.current;
    if (!db) {
      throw new Error('数据库实例为空');
    }

    try {
      switch (operation) {
        case 'put':
          return await db.put(tableName, val, key);
        case 'get':
          return await db.get(tableName, key);
        case 'delete':
          return await db.delete(tableName, key);
        case 'clear':
          return await db.clear(tableName);
        default:
          throw new Error('未知操作');
      }
    } catch (error) {
      console.error(`数据库操作失败: ${operation}`, error);
      throw error; // 重新抛出错误以便外部处理 }
    }
  };
  return {
    isConnected: !!dbRef.current,
    db: dbRef.current,
    set: (key: string, val: any) => executeDBOperation('put', key, val),
    get: (key: string) => executeDBOperation('get', key),
    remove: (key: string) => executeDBOperation('delete', key),
    clear: () => executeDBOperation('clear', tableName),
    tableNames: () => dbRef.current?.objectStoreNames,
    keys: () => dbRef.current?.getAllKeys(tableName),
  };
};
