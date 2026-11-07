import * as notificacionService from '../services/notificacionService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getNotificaciones  = asyncHandler(async (req, res) => res.json(await notificacionService.listar(req.query)));
export const createNotificacion = asyncHandler(async (req, res) => res.status(201).json(await notificacionService.crear(req.body)));
export const marcarLeida        = asyncHandler(async (req, res) => res.json(await notificacionService.marcarLeida(req.params.id)));