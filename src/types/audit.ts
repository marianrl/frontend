import {AuditType} from "./auditType";
import {Audited} from "./audited";


export interface Audit {
    id: number;
    audit_number: number;
    auditDate: string;
    idTipoAuditoria: AuditType;
    idAuditado: Audited;
}