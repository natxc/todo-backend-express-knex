/* 
  Update with your config settings.
  The test database and development database are by default the same.
  Knex also allows for easy switching between databases. 
  But the .returning() method will only work for PostgreSQL, MSSQL, and Oracle databases.
*/
require('dotenv').config();
module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      database: process.env.PGDATABASE,
      user:     process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.PGDATABASE,
      user:     process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
