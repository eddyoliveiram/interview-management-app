const mongoose = require('mongoose');
const Vaga = require('@/app/models/Vaga');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/gerenciamentoVagas';

async function runMigration() {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB.');

    // Verifique se a coleção já existe
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('vagas')) {
        console.log('Coleção "vagas" não existe. Criando...');

        await Vaga.createCollection();

        console.log('Coleção "vagas" criada com sucesso.');

        await Vaga.createIndexes();

        console.log('Índices criados para a coleção "vagas".');
    } else {
        console.log('Coleção "vagas" já existe.');
    }

    mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
}

runMigration().catch(error => {
    console.error('Erro durante a migração:', error);
});
