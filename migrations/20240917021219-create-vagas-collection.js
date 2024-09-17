module.exports = {
  async up(db, client) {
    await db.dropDatabase();

    const collections = await db.listCollections({ name: 'vagas' }).toArray();
    if (collections.length > 0) {
      await db.collection('vagas').drop();
    }

    await db.createCollection('vagas');

    await db.collection('vagas').createIndex({ empresa: 1 }, { unique: true });
  },

  async down(db, client) {
    const collections = await db.listCollections({ name: 'vagas' }).toArray();
    if (collections.length > 0) {
      await db.collection('vagas').drop();
    }
  }
};
