/**
 * 全局配置文件
 * @date 2022-07-08
 */
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASEPORT, 10) || 5432,
  },
});
