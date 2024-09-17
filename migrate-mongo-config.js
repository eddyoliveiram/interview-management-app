// migrate-mongo-config.js
module.exports = {
  mongodb: {
    // The URL to connect to your MongoDB instance
    url: "mongodb://localhost:27017",

    // Your MongoDB database name
    databaseName: "gerenciamentoVagas",  // Change this to your database name

    options: {
      // Deprecated options for MongoDB 4.x+, these can be removed if using a newer driver version
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  },

  // The directory where your migration files are stored
  migrationsDir: "migrations",

  // The MongoDB collection where the migration changelog is stored
  changelogCollectionName: "changelog",

  // The file extension for migration files
  migrationFileExtension: ".js",

  // Don't change this unless you understand the implications
  moduleSystem: 'commonjs',
};
