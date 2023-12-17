import { Alert } from '@/domain/entities/Alert';
import { IBrokerUseCases } from '@/domain/use-cases/broker';
import express from 'express'
import { Request, Response } from 'express'
import { validationInMiddleware } from '../middleware/validation-middleware';
import { AlertDTO } from '../dto/alert-dto';
import { ICommonUseCases } from '@/domain/use-cases/common';
import { Groups } from '../utils/groups';
import mongoose from 'mongoose';

/**
 * Alert router wrapper 
 * @returns - Express Alerts router
 */
export default function AlertRouter(brokerUseCases: IBrokerUseCases, commonUseCases: ICommonUseCases<Alert>) {
  const router = express.Router()

  router.post('/send', validationInMiddleware(AlertDTO, [Groups.CREATE]), async (req: Request, res: Response) => {
      await brokerUseCases.send('alarms', {...req.body, site: new mongoose.mongo.ObjectId(req.body.site)});
      res.status(201).json({ message: 'Alert sent to broker queue', alert: req.body})
  });

  router.post('/', validationInMiddleware(AlertDTO, [Groups.CREATE]), async (req: Request, res: Response) => {
      const newAlert = await commonUseCases.add({...req.body, site: new mongoose.mongo.ObjectId(req.body.site)});
      res.status(201).json({ message: 'Alert created', alert: newAlert})
  });

  return router

}