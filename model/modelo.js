const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    
{
    nombre: {
        type: String,
        required: true,
    },

    precio: {
        type: Number,
        required: true,
        min: 0,
    },

    categoria: {
        type: String,
        required: true,
        default: 'General',
    },

    disponible: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model('modelo', userSchema);