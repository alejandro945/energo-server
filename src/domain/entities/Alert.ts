
export interface Alert {
    site?: string;
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

export interface AlertGrouped {
    count: number;
    details: Alert[];
}

export interface AlertSummary {
    [AlertSeverity.HIGH]: AlertGrouped;
    [AlertSeverity.MEDIUM]: AlertGrouped;
    [AlertSeverity.LOW]: AlertGrouped;
}