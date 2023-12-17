import { Exclude, Expose } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Groups } from "../utils/groups";

export class AlertDTO {
    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Id is required in creation" })
    @IsMongoId({ groups: [Groups.CREATE, Groups.UPDATE], message: "Id must be a valid MongoId" })  
    site!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Severity is required in creation" })
    @IsString({ message: "Severity must be a string" })
    severity!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Metric is required in creation"})
    @IsString({ message: "Metric must be a string"})
    metric!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Unit is required in creation"})
    @IsString({ message: "Unit must be a string"})
    unit!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Time is required in creation"})
    @IsString({ message: "Time must be a string"})
    time!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Threshold is required in creation"})
    @IsNumber()
    threshold!: number;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Value is required in creation"})
    @IsNumber()
    value!: number;
}