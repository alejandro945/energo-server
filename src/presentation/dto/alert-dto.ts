import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Groups } from "../utils/groups";

export class AlertDTO {
    @Exclude()
    site!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty({ groups: [Groups.CREATE], message: "Severity is required in creation" })
    @IsString({ message: "Severity must be a string" })
    severity!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty()
    @IsString()
    metric!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty()
    @IsString()
    unit!: string;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty()
    time!: string;


    @Expose({ groups: Groups.all() })
    @IsNotEmpty()
    @IsNumber()
    threshold!: number;

    @Expose({ groups: Groups.all() })
    @IsNotEmpty()
    @IsNumber()
    value!: number;
}