import * as prestamoService from '../services/prestamoService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getPrestamos    = asyncHandler(async (req, res) => res.json(await prestamoService.listar(req.query)));
export const getPrestamoById = asyncHandler(async (req, res) => res.json(await prestamoService.obtenerPorId(req.params.id)));
export const createPrestamo  = asyncHandler(async (req, res) => res.status(201).json(await prestamoService.crear(req.body)));
export const updatePrestamo  = asyncHandler(async (req, res) => res.json(await prestamoService.actualizar(req.params.id, req.body)));
export const deletePrestamo  = asyncHandler(async (req, res) => res.json(await prestamoService.cancelar(req.params.id)));