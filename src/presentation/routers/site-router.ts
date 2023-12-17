import { Site } from '@/domain/entities/Site'
import { ICommonUseCases, ISitesUseCases } from '@/domain/use-cases/common'
import express from 'express'
import { Request, Response } from 'express'
import { SiteDTO } from '../dto/site-dto'
import { validationInMiddleware } from '../middleware/validation-middleware'
import { Groups } from '../utils/groups'

/**
 * Site router wrapper
 * @param commonUseCases - Common use cases
 * @returns - Express Sites router
 */
export default function SiteRouter(commonUseCases: ISitesUseCases) {
    const router = express.Router()

    router.get('/', async (_: Request, res: Response) => {
        const sites = await commonUseCases.getSummary()
        res.status(200).send(sites)
    })

    router.post('/', validationInMiddleware(SiteDTO, [Groups.CREATE]), async (req: Request, res: Response) => {
        const newSite = await commonUseCases.add(req.body)
        res.status(201).json({ message: 'Site created', site: newSite })
    })

    return router
}