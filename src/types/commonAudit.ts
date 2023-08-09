import {Client} from "./client";
import {Branch} from "./branch";
import {Features} from "./features";

export interface CommonAudit {
    id: number;
    auditDate: string;
    lastName: string;
    name: string;
    cuil: string;
    file: string;
    allocation: string;
    client: Client;
    uoc: string;
    branch: Branch;
    admissionDate: string;
    features: Features;
}