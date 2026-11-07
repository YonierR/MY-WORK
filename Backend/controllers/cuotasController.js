import * as cuotaService from '../services/cuotaService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getCuotas    = asyncHandler(async (req, res) => res.json(await cuotaService.listar(req.query)));
export const getCuotaById = asyncHandler(async (req, res) => res.json(await cuotaService.obtenerPorId(req.params.id)));
export const updateCuota  = asyncHandler(async (req, res) => res.json(await cuotaService.actualizar(req.params.id, req.body)));