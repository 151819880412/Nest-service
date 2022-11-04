// src/database/redis.ts
import Redis from 'ioredis';
import { redisConfig } from 'src/config/database';

const n = 0;
const redisIndex = []; // 用于记录 redis 实例索引
const redisList: Array<Redis> = []; // 用于存储 redis 实例

export class RedisInstance {
  static async initRedis(method: string, db = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      // Logger.debug(`[Redis ${db}]来自 ${method} 方法调用, Redis 实例化了 ${++n} 次 `)
      redisList[db] = new Redis({ ...redisConfig, db });
      redisIndex.push(db);
    } else {
      // Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`)
    }
    return redisList[db];
  }

  /**
   * 设置 redis token
   * @date 2022-07-25
   * @param {any} method:string
   * @param {any} db=0
   * @param {any} key:string
   * @param {any} val:string
   * @param {any} timeout=60*60
   * @returns {any}
   */
  static async setRedis(
    method: string,
    db: any = 0,
    key: string,
    val: string,
    timeout: any = 60 * 60,
  ): Promise<void> {
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    const redis = await RedisInstance.initRedis(method, db);
    redis.set(`${key}`, val);
    redis.expire(`${key}`, timeout);
  }

  /**
   * 从 redis 获取 token
   * @date 2022-07-25
   * @param {any} method:string
   * @param {any} db=0
   * @param {any} key:string
   * @returns {any}
   */
  static async getRedis(
    method: string,
    db: any = 0,
    key: string,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const redis = await RedisInstance.initRedis(method, db);
      redis.get(`${key}`, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }

  static async delRedis(method: string, db = 0, key: string) {
    const redis = await RedisInstance.initRedis(method, db);
    redis.del(`${key}`);
  }
}
