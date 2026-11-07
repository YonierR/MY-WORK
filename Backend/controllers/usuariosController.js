import * as usuarioService from '../services/usuarioService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getUsuarios     = asyncHandler(async (req, res) => res.json(await usuarioService.listar()));
export const getUsuarioById  = asyncHandler(async (req, res) => res.json(await usuarioService.obtenerPorId(req.params.id)));