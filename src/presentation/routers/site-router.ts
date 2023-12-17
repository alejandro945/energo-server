import { Site } from '@/domain/entities/Site'
import { ICommonUseCases } from '@/domain/use-cases/common'
import express from 'express'
import { Request, Response } from 'express'
import { SiteDTO } from '../dto/site-dto'
import { validationInMiddleware, validationOutMiddleware } from '../middleware/validation-middleware'
import { Groups } from '../utils/groups'

/**
 * Site router wrapper
 * @param commonUseCases - Common use cases
 * @returns - Express Sites router
 */
export default function SiteRouter(commonUseCases: ICommonUseCases<Site>) {
    const router = express.Router()

    router.get('/', async (_: Request, res: Response) => {
        try {
            const sites = await commonUseCases.getAll()
            res.status(200).send(sites)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Error fetching sites", details: err })
        }
    })

    router.post('/', validationInMiddleware(SiteDTO), async (req: Request, res: Response) => {
        try {
            const newSite = await commonUseCases.add(req.body)
            const siteOUTDTO = validationOutMiddleware(newSite, [Groups.READ])
            res.status(201).json(siteOUTDTO)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Error creating site", details: err })
        }
    })

    return router
}