const mongoose = require('mongoose');

const CitaSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fechaCita: {
        type: Date,
        required: true,
    },
    horaCita: {
        type: String,
        required: true,
    },
    medico: {
        type: String,
        required: true,
    },
}, {
    // Esto asegura que no se puedan crear documentos con la misma combinación de usuario, fechaCita, horaCita y medico
    unique: ['usuario', 'fechaCita', 'horaCita', 'medico'],
});

module.exports = mongoose.model('Cita', CitaSchema);
