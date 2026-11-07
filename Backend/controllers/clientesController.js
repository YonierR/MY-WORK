import * as clienteService from '../services/clienteService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getClientes    = asyncHandler(async (req, res) => res.json(await clienteService.listar(req.query)));
export const getClienteById = asyncHandler(async (req, res) => res.json(await clienteService.obtenerPorId(req.params.id)));
export const createCliente  = asyncHandler(async (req, res) => res.status(201).json(await clienteService.crear(req.body)));
export const updateCliente  = asyncHandler(async (req, res) => res.json(await clienteService.actualizar(req.params.id, req.body)));
export const deleteCliente  = asyncHandler(async (req, res) => res.json(await clienteService.desactivar(req.params.id)));