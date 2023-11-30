const express = require('express');
const Cita = require('../models/citasModel');
const User = require('../models/usersModel');
const mongoose = require('mongoose');
const router = express.Router();

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.find();

        if (citas.length > 0) {
            return res.status(200).json({
                success: true,
                data: citas,
            });
        } else {
            return res.status(404).json({
                success: false,
                msg: "No hay citas",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}`,
        });
    }
});

// Obtener una cita por su ID
router.get('/:id', async (req, res) => {
    const citaId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(citaId)) {
            return res.status(500).json({
                success: false,
                msg: "ID inválido",
            });
        }

        const cita = await Cita.findById(citaId);

        if (!cita) {
            return res.status(404).json({
                success: false,
                msg: "Cita no encontrada",
            });
        } else {
            return res.status(200).json({
                success: true,
                data: cita,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}`,
        });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    try {
        // Buscar al usuario por su ID
        const usuario = await User.findById(req.body.usuario);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado",
            });
        }

        // Verificar si ya existe una cita con la misma combinación de usuario, fecha, hora y médico
        const existingCita = await Cita.findOne({
            usuario: req.body.usuario,
            fechaCita: req.body.fechaCita,
            horaCita: req.body.horaCita,
            medico: req.body.medico,
        });

        if (existingCita) {
            return res.status(400).json({
                success: false,
                msg: "Ya existe una cita con la misma información",
            });
        }

        const nuevaCita = {
            usuario: usuario._id, // Usar el ID del usuario en lugar de su nombre
            fechaCita: req.body.fechaCita,
            horaCita: req.body.horaCita,
            medico: req.body.medico,
        };

        const cita = await Cita.create(nuevaCita);

        return res.status(201).json({
            success: true,
            data: cita,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}`,
        });
    }
});

// Actualizar una cita por su ID
router.put('/:id', async (req, res) => {
    const citaId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(citaId)) {
            return res.status(500).json({
                success: false,
                msg: "ID inválido",
            });
        }

        const updatedCita = await Cita.findByIdAndUpdate(
            citaId,
            req.body,
            { new: true }
        );

        if (!updatedCita) {
            return res.status(404).json({
                success: false,
                msg: "Cita no encontrada",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedCita,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}`,
        });
    }
});

// Eliminar todas las citas
router.delete('/', async (req, res) => {
    try {
        const result = await Cita.deleteMany();

        return res.json({
            success: true,
            msg: `Se eliminaron ${result.deletedCount} citas`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}`,
        });
    }
});

// Eliminar una cita por su ID
router.delete('/:id', async (req, res) => {
    const citaId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(citaId)) {
            return res.status(500).json({
                success: false,
                msg: "ID inválido",
            });
        }

        const deletedCita = await Cita.findByIdAndDelete(citaId);

        if (!deletedCita) {
            return res.status(404).json({
                success: false,
                msg: "Cita no encontrada",
            });
        }

        return res.json({
            success: true,
            msg: `Cita eliminada correctamente: ${citaId}`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}`,
        });
    }
});

// Otras rutas...

module.exports = router;
