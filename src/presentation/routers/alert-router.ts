import { Alert } from '@/domain/entities/Alert';
import { IBrokerUseCases } from '@/domain/use-cases/broker';
import express from 'express'
import { Request, Response } from 'express'
import { validationInMiddleware } from '../middleware/validation-middleware';
import { AlertDTO } from '../dto/alert-dto';

/**
 * Alert router wrapper 
 * @returns - Express Alerts router
 */
export default function AlertRouter(borkerUseCases: IBrokerUseCases<Alert>) {
  const router = express.Router()

  router.post('/send',validationInMiddleware(AlertDTO), async (req: Request, res: Response) => {
    await borkerUseCases.send( 'alarms', req.body);
    res.status(201).json(req.body)
  });

}