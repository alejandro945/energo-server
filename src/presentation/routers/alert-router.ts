import { Alert } from '@/domain/entities/Alert';
import { IBrokerUseCases } from '@/domain/use-cases/broker';
import express from 'express'
import { Request, Response } from 'express'
import { validationInMiddleware, validationOutMiddleware } from '../middleware/validation-middleware';
import { AlertDTO } from '../dto/alert-dto';
import { ICommonUseCases } from '@/domain/use-cases/common';
import { Groups } from '../utils/groups';

/**
 * Alert router wrapper 
 * @returns - Express Alerts router
 */
export default function AlertRouter(brokerUseCases: IBrokerUseCases, commonUseCases: ICommonUseCases<Alert>) {
  const router = express.Router()

  router.post('/send', validationInMiddleware(AlertDTO), async (req: Request, res: Response) => {
    await brokerUseCases.send('alarms', req.body);
    res.status(201).json(req.body)
  });

  router.post('/create', validationInMiddleware(AlertDTO), async (req: Request, res: Response) => {
    const newAlert = await commonUseCases.add(req.body);
    const alertOUTDTO = validationOutMiddleware(newAlert, [Groups.READ])
    res.status(201).json(alertOUTDTO)
  });

  return router

}