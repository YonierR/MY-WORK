import * as dashboardService from '../services/dashboardService.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const getDashboard = asyncHandler(async (req, res) => {
  res.json(await dashboardService.obtenerDashboard());
});