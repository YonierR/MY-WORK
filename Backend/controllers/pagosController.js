import * as pagoService from '../services/pagoService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getPagos   = asyncHandler(async (req, res) => res.json(await pagoService.listar(req.query)));
export const createPago = asyncHandler(async (req, res) => res.status(201).json(await pagoService.registrar(req.body)));