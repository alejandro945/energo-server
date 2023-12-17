import { Alert } from "./Alert";
import { Base } from "./Base";

export interface Site extends Base {
    name: string;
    alerts?: Alert[];
    savings: string; 
    uptime: string;
    power: string; 
}