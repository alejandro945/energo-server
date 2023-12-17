import { Base } from "./Base";

export interface Alert extends Base {
    severity: AlertSeverity;
    metric: string; //Could be an instace of Metric
    unit: string; //Could be an instace of Unit
    time: Date;
    threshold: number;
    value: number;
}

export enum AlertSeverity {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}