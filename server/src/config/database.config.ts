export default () => ({
  database: {
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT ?? 3306,
    username: process.env.MARIADB_USERNAME,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
  },
});
