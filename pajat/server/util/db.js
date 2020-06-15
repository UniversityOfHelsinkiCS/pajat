const Sequelize = require('sequelize');
const Umzug = require('umzug');

const DB_CONNECTION_RETRY_LIMIT = 5;

class Connection {
  constructor() {
    this.error = false;
    this.established = false;
  }

  async connectToDatabase(attempt = 1) {
    this.error = false;
    this.established = false;
    try {
      this.sequelize = new Sequelize({
        dialect: 'postgres',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
      });
      await this.sequelize.authenticate();
      console.log('Connected to database successfully!');
      await this.runMigrations();
      this.established = true;
    } catch (e) {
      if (attempt === DB_CONNECTION_RETRY_LIMIT) {
        console.log(`Connection to database failed after ${attempt} attempts`);
        console.error(e);
        this.error = true;
        return;
      }
      console.log(
        `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`
      );
      setTimeout(() => this.connectToDatabase(attempt + 1), 1000 * attempt);
    }
  }

  async runMigrations() {
    try {
      const migrator = new Umzug({
        storage: 'sequelize',
        storageOptions: {
          sequelize: this.sequelize,
          tableName: 'migrations',
        },
        logging: console.log,
        migrations: {
          params: [this.sequelize.getQueryInterface(), Sequelize],
          path: `${process.cwd()}/server/util/migrations`,
          pattern: /\.js$/,
        },
      });
      const migrations = await migrator.up();
      console.log('Migrations up to date', migrations);
    } catch (e) {
      this.error = true;
      console.log('Migration error', e);
    }
  }
}

const connection = new Connection();
connection.connectToDatabase();

module.exports = { connection };
