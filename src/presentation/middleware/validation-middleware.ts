import { NextFunction, Request, Response } from 'express'
import { ClassConstructor, classToPlain, instanceToPlain, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { Groups } from '../utils/groups';

export const validationInMiddleware = (validationSchema: ClassConstructor<unknown>, groups: string[] = []) => async (req: Request, _res: Response, next: NextFunction) => {
    req.body = Object.setPrototypeOf(req.body, validationSchema.prototype);
    const errors = await validate(req.body, {
        groups,
        whitelist: true,
        forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
        throw new ValidationError().children = errors;
    }
    req.body = plainToInstance(validationSchema, req.body, { groups });
    next();
}; 

export function validationOutMiddleware<T>(body: T | T[], groups: string[]) {
	return Array.isArray(body)
		? {
				object: "list",
				data: body.map((item) => instanceToPlain(item, { groups, excludeExtraneousValues: true })),
		  }
		: instanceToPlain(body, { groups, excludeExtraneousValues: true });
}