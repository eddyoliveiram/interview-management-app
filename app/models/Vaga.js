const mongoose = require('mongoose');

const VagaSchema = new mongoose.Schema({
    empresa: {
        type: String,
        required: [true, 'O campo empresa é obrigatório'],
    },
    cargo: {
        type: String,
        required: [true, 'O campo cargo é obrigatório'],
    },
    descricaoVaga: String,
    curriculoEnviado: String,
    salarioModalidade: String,
    origem: {
        type: String,
        enum: ['Jobs', 'Post', 'Chat'],
        default: 'Jobs',
    },
    status: {
        type: String,
        enum: ['Currículo Enviado', 'Currículo Rejeitado', 'Fase 01', 'Fase 02', 'Fase 03', 'Fase 04'],
        default: 'Currículo Enviado',
    },
    notas: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.models.Vaga || mongoose.model('Vaga', VagaSchema);
